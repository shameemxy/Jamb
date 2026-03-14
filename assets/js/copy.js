function copyCode(){

let code = document.getElementById("programCode").innerText

navigator.clipboard.writeText(code)

alert("Code copied!")

}