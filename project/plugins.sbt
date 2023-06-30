addSbtPlugin("com.github.sbt" % "sbt-native-packager" % "1.9.4")

//Only needed if you're building on Mac!
libraryDependencies += "org.vafer" % "jdeb" % "1.3" artifacts (Artifact("jdeb", "jar", "jar"))