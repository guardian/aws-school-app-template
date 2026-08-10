import cats.effect._
import com.comcast.ip4s.IpLiteralSyntax
import org.http4s.headers.`Content-Type`
import org.http4s.{HttpRoutes, MediaType}
import org.http4s.dsl.io._
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.implicits._
import org.http4s.server.Router
import org.slf4j.LoggerFactory
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest

object Main extends IOApp {
  private val logger = LoggerFactory.getLogger(getClass)

  private val binfaceBucket = "aws-school-iam-files"
  private val binfaceKey = "count_binface.html"

  private val s3Client = S3Client.builder().region(Region.EU_WEST_1).build()

  private val fetchBinface: IO[String] = IO.blocking {
    val request = GetObjectRequest.builder().bucket(binfaceBucket).key(binfaceKey).build()
    s3Client.getObjectAsBytes(request).asUtf8String()
  }

  private val exampleService = HttpRoutes.of[IO] {
    case GET -> Root / "healthcheck" =>
      Ok("We are healthy")
    case GET -> Root / "hello" =>
      Ok("Hello World")
    case GET -> Root / "hello" / name =>
      Ok(s"Hello $name")
    case GET -> Root / "binface" =>
      fetchBinface
        .flatMap(html => Ok(html, `Content-Type`(MediaType.text.html)))
        .handleErrorWith { error =>
          logger.error(s"Failed to fetch s3://$binfaceBucket/$binfaceKey", error)
          InternalServerError("Could not fetch Count Binface")
        }
  }

  def run(args:List[String]):IO[ExitCode] = {
    val httpApp = Router("/" -> exampleService).orNotFound
    logger.info("Starting up example server on 0.0.0.0 port 9000")
    EmberServerBuilder.default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(port"9000")
      .withHttpApp(httpApp)
      .build
      .use(_=>IO.never)
      .as(ExitCode.Success)
  }
}
