firebase.initializeApp(config);

var database = firebase.database()

let name = ""
let dest = ""
let arrival = ""
let freq = ""
let time = moment().format('HH:mm');
let next;
let min;
let tillFerry;
let nextFerry;

console.log(time);

$(".submitbtn").on("click", function (event) {
    event.preventDefault();
    name = $("#ferryName").val().trim();
    dest = $("#ferryDes").val().trim();
    arrival = $("#firstTime").val().trim();
    freq = $("#ferryFreq").val().trim();

    moment(arrival).format('HH.mm');

    let converted = moment(arrival, 'HH:mm').subtract(1, "years");
    let diff = moment().diff(moment(converted, 'minutes'));
    let remain = diff % freq;

    tillFerry = freq - remain;
    nextFerry = moment().add(tillFerry, "minutes").format("HH.mm a");

    $('#ferryName').val('');
    $('#ferryDes').val('');
    $('#firstTime').val('');
    $('#ferryFreq').val('')

    database.ref().push({
        name: name,
        dest: dest,
        arrival: arrival,
        freq: freq,
        tillFerry: tillFerry,
        nextFerry: nextFerry,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapshot) {

    $(".table").prepend("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().dest + "</td>" + "<td>" +
        childSnapshot.val().arrival + "</td>" + "<td>" + childSnapshot.val().freq + "</td>" + "<td>" +
        childSnapshot.val().nextFerry + "</td>" + "<td>" + childSnapshot.val().tillFerry + "</td></tr>")
},

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
;