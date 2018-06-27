package com.d8.app;
import static spark.Spark.*;
import com.google.common.base.Charsets;
import com.google.common.io.Files;
import java.io.*;
/**
 * Hello world!
 *
 */

public class App {

    public static void main(String[] args) {
        String content = "";
        File file = new File("/Users/christianlowe/.atom/D8/d8-app/src/main/public/views/index.html");
        try {
        content += Files.toString(file, Charsets.UTF_8);
      } catch (IOException error) {
        System.out.println("sorry couldn\n't fufll your request");
      }
      final String html = content;
        port(getHerokuAssignedPort());
        get("/", (req, res) -> html);

        String cssContent = "";
        File cssFile = new File("/Users/christianlowe/.atom/D8/d8-app/src/main/public/css/styles.css");
        try {
        cssContent += Files.toString(cssFile, Charsets.UTF_8);
      } catch (IOException error) {
        System.out.println("sorry couldn\n't fufll your request");
      }
      final String css = cssContent;
      get("/styles.css", (req, res) -> { res.type("text/css"); return css; });

    }



    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }

}
