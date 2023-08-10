/*-------------------------------------
Show / Hide
--------------------------------------*/
function showElement(id) {
    if (document.getElementById(id).classList.contains('d-none'))
        document.getElementById(id).classList.remove('d-none');
    if (document.getElementById(id).classList.contains('hidden'))
        document.getElementById(id).classList.remove('hidden');
}


function hideElement(id) {
    document.getElementById(id).classList.add('hidden');
}


function removeElement(id) {
    document.getElementById(id).classList.add('d-none');
}


function pushElementToBack(id) {
    if (document.getElementById(id).classList.contains('pulled-to-front'))
        document.getElementById(id).classList.remove('pulled-to-front');
    document.getElementById(id).classList.add('pushed-to-back');
}


function pullElementToFront(id) {
    if (document.getElementById(id).classList.contains('pushed-to-back'))
        document.getElementById(id).classList.remove('pushed-to-back');
    document.getElementById(id).classList.add('pulled-to-front');
}


/*-------------------------------------
Include HTML Templates
--------------------------------------*/
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}