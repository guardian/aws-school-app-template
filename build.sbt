ThisBuild / version := "1.0"

ThisBuild / scalaVersion := "2.13.11"

lazy val root = (project in file("."))
  .settings(
    name := "aws-school-app-template",
    libraryDependencies ++= Seq(
      "org.http4s" %% "http4s-core" % "0.23.21",
      "org.http4s" %% "http4s-dsl" % "0.23.21",
      "org.http4s" %% "http4s-ember-server" % "0.23.21",
      "ch.qos.logback" % "logback-classic" % "1.4.7",
      "net.logstash.logback" % "logstash-logback-encoder" % "7.3",
    )
  )
