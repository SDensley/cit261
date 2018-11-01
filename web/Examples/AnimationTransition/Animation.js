/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/js/js_ajax_http_response.asp
**********************************************************************/
// open a JSON File and perform some action
function openJson(url, callbackFunc) {
    // initiate a new XMLHttp request
    let xmlhttp = new XMLHttpRequest();

    // function to perform upon request completion
    xmlhttp.onreadystatechange = function () {
        // check for completion and ok status
        if (this.readyState == 4 && this.status == 200) {
            // initiate callback function
            callbackFunc(this);
        }
    }
    // create the request specifics
    xmlhttp.open("GET", url, true);

    // send the request to the server
    xmlhttp.send();
}

/*********************************************************************
* This function is derived from code on W3Schools.com
* Source: https://www.w3schools.com/jsref/prop_win_localstorage.asp
**********************************************************************/
// reload the json file contents into session storage
function loadLocal(xhttp) {
    // check for storage support
    if (typeof (Storage) !== "undefined") {
        // create an object and parse the JSON file
        let rdiObj = JSON.parse(xhttp.responseText);

        // loop through the object adding properties to session storage
        for (let version in rdiObj.versions) {
            // loop through the characters adding them to session storage
            for (let character in rdiObj.versions[version].characters) {
                // get the character image string for the key
                let key = rdiObj.versions[version].characters[character].image;

                // get the character object and append the version to its members
                let characterObj = rdiObj.versions[version].characters[character];
                characterObj.version = rdiObj.versions[version].version;

                // stringify the character objectto store it in session storage
                let value = JSON.stringify(characterObj);

                // append the character to session storage
                sessionStorage.setItem(key, value);
            }
        }
        // return that it succeeded
        return true;
    } else {
        // create an error string to display
        let error = "<h3>Your browser does not support web storage,"
                  + " this page requires session storage support to work properly.</h3>";

        // Notify the user that session storage is not supported
        document.getElementById("characterDetails").innerHTML = error;

        // return that it failed
        return false;
    }
}

// generate the select options
function loadContent(xhttp) {
    // call load session to load the JSON file
    let success = loadLocal(xhttp);

    // check to see that loadLocal executed
    if (success) {
        // check to see if session storage exists
        if (sessionStorage.getItem("The Red Dragon Inn") === null) {
            // display an error message indicating no session storage
            txt = "<h3>Error: Local storage is not currently loaded.</h3>";
            console.log(txt);
        } else {
            // get the length of the sessionStorage object
            let lslen = sessionStorage.length;

            // Populate the header
            document.getElementById("characterHeader").innerHTML = "The Red Dragon Inn Card Game";

            // create a string variable to store the display contents
            let txt = "";

            // loop through the session storage keys displaying each one
            for (let count = 0; count < lslen; count++) {
                // create the option element
                let key = sessionStorage.key(count);
                let value = JSON.parse(sessionStorage.getItem(key));

                // display the version
                txt += displayImage(value);
            }
        }
        // display the data from the session storage in a nice format
        document.getElementById("charactersList").innerHTML = txt;
    }
}

// genearte the code for an image
function displayImage(obj) {
    // Create the image tag
    let txt = "<img src='" + obj.image + "'";
    txt += " alt='" + obj.name + "'";
    txt += " height='200' width='200' id='" + obj.image + "'>";

    // return the content
    return txt;
}

// display a character's details
function displayCharacter(obj) {
    // start the table and add the columns
    let txt = "<table>";

    // display the character details
    txt += "<tr><td>" + obj.name + "</td><td>" + obj.race + "</td><td>" + obj.class + "</td><td>";
    if (obj.good === undefined) {
        txt += "</td><td>";
    } else {
        txt += obj.good + "</td><td>";
    }
    txt += obj.bad + "</td><td>";
    if (obj.worse === undefined) {
        txt += "</td></tr>";
    } else {
        txt += obj.worse + "</td><td>";
    }
    txt += "<img src='" + obj.image + "'" + " alt='" + obj.name + "'"
        + " height='200' width='200' id='" + obj.image + "'></td></tr>";

    // close the table
    txt += "</table>";

    // return the content
    return txt;
}