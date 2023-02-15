let completed_teams_percentage = 0;
let assigned_students_percentage = 0;

let complete_teams_circle = document.getElementById('completed-teams-circle');
let assigned_students_circle = document.getElementById('assigned-students-circle');

complete_teams_circle.children[0].textContent    = completed_teams_percentage.toFixed(2) + "%";
assigned_students_circle.children[0].textContent = assigned_students_percentage.toFixed(2) + "%";

complete_teams_circle.style.backgroundImage    = "conic-gradient(var(--circle-foreground) " + completed_teams_percentage.toFixed(2) + "%"+ ", var(--circle-background) 0)";
assigned_students_circle.style.backgroundImage = "conic-gradient(var(--circle-foreground) " + assigned_students_percentage.toFixed(2) + "%"+ ", var(--circle-background) 0)";


function grow(amount){
    console.log(amount)
    completed_teams_percentage += amount;
    completed_teams_percentage = Math.min(completed_teams_percentage, 100);

    complete_teams_circle.children[0].textContent = completed_teams_percentage.toFixed(2) + "%";
    complete_teams_circle.style.backgroundImage   = "conic-gradient(var(--circle-foreground) " + completed_teams_percentage.toFixed(2) + "%"+ ", var(--circle-background) 0)";
}

function shrink(amount){
    console.log(amount)
    completed_teams_percentage -= amount;
    completed_teams_percentage = Math.max(completed_teams_percentage, 0);

    complete_teams_circle.children[0].textContent = completed_teams_percentage.toFixed(2) + "%";
    complete_teams_circle.style.backgroundImage   = "conic-gradient(var(--circle-foreground) " + completed_teams_percentage.toFixed(2) + "%"+ ", var(--circle-background) 0)";
}

function testRequest(){
    fetch('/log')
        .then((response) => response.text())
        .then((data) => console.log(data));
}
