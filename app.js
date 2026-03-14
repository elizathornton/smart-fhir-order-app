FHIR.oauth2.ready()
.then(async function(client) {

    const patient = await client.patient.read();

    document.getElementById("output").innerHTML =
        "<h3>Patient</h3>" +
        "Name: " + patient.name[0].given.join(" ") + " " + patient.name[0].family +
        "<br>DOB: " + patient.birthDate +
        "<br>Gender: " + patient.gender;

})
.catch(function(error){

    console.error(error);

    document.getElementById("output").innerText =
        "SMART launch failed";

});
