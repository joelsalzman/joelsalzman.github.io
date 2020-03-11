<!DOCTYPE html>
<html lang="en">

    <head>

        <title>Geographic Distribution of Voting Power</title>

        <link rel="stylesheet" href="./theme.css" type="text/css">

        <!-- Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""/>
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

        <!-- JQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <head>

    <body style="overflow: hidden;">

         <!-- Header -->
         <header class="header">

            <!-- Return to homepage -->
            <a class="button button-main" id="button-back" href="./index"> < </a>

            <!-- Tooltip Open/Close -->
            <div class="button" id="button-tooltip"><span id="button-tooltip-text">Open Tooltip</span></div>

            <!-- GitHub Repo -->
            <a class="button button-main" href="http://github.com/joelsalzman/Voting-Power">Explanation</a>

        </header>

        <!-- Body -->
        <div class="body-container">

            <!-- Map -->
            <div id="gdvp-map"></div>

            <!-- Tooltip -->
            <div id="tooltip">

            </div>

        </div>

        <!-- Load the JavaScript -->
        <script src="./gdvp.js"></script>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>

    </body>

</html>