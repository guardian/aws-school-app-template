import cats.effect._
import com.comcast.ip4s.IpLiteralSyntax
import org.http4s.HttpRoutes
import org.http4s.dsl.io._
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.implicits._
import org.http4s.server.Router
import org.slf4j.LoggerFactory

object Main extends IOApp {
  private val logger = LoggerFactory.getLogger(getClass)

  private val exampleService = HttpRoutes.of[IO] {
    case GET -> Root / "healthcheck" =>
      Ok("We are healthy")
    case GET -> Root / "hello" =>
      Ok("Hello World")
    case GET -> Root / "hello" / name =>
      Ok(s"Hello $name")
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
