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

  public static String render(String file_location) {
    String content = "";
    File file = new File(file_location);
    try {
      content += Files.toString(file, Charsets.UTF_8);
    } catch (IOException error) {
      System.out.println("sorry couldn\'t fufll your request for: " + file_location + error);
    }
    final String file_content = content;
    return file_content;
  }

    public static void main(String[] args) {

        port(getHerokuAssignedPort());

      get("/", (req, res) -> {
          return render("./src/main/public/views/index.html");
      });

      get("/results", (req, res) -> {
          return render("./src/main/public/views/results.html");
      });

      get("/quiz", (req, res) -> {
          return render("./src/main/public/views/quiz.html");
      });


      get("/styles.css", (req, res) -> {
        res.type("text/css");
        return render("./src/main/public/css/styles.css");
      });

      get("/resultCarouselStyle.css", (req, res) -> {
        res.type("text/css");
        return render("./src/main/public/css/resultCarouselStyle.css");
      });

      get("/js", "text/javascript", (req, res) -> {
        String jsFile = req.queryParams("jsFile");
        return render("./src/main/public/js/" + jsFile + ".js" );
      });

      get("/defaultImages", (req, res) -> {
        String coverImage = req.queryParams("coverImage");
        if(coverImage.substring(coverImage.lastIndexOf('.') + 1) == "png") {
          res.type("image/png");
        } else {
          res.type("image/jpg");
        }
        return render("./src/main/public/defaultImages/" + coverImage);
      });

    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }

}
