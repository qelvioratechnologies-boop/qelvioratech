// Career applications have a dedicated form, separate from training and service enquiries.
(()=>{
const form=document.querySelector("#career-application-form"),role=document.querySelector("#career-role"),experience=document.querySelector("#candidate-experience"),fields=document.querySelector("#experienced-fields"),resume=document.querySelector("#candidate-resume"),status=document.querySelector("#career-form-status");
const roles={"Business Development Executive":{salary:"₹3.5 LPA",experience:"Fresher"},"Sales Executive":{salary:"₹3.5 LPA"},"Lead Generation Executive":{salary:"₹4 LPA"}};
function updateRole(){const data=roles[role.value],summary=document.querySelector("#selected-role-summary");summary.replaceChildren();if(data){const title=document.createElement("strong");title.textContent=role.value;const salary=document.createElement("p");salary.textContent="Advertised annual salary: "+data.salary;summary.append(title,salary);if(data.experience){const note=document.createElement("p");note.textContent="Opening for freshers";summary.append(note);experience.value="Fresher";updateExperience()}}document.querySelector("#career-subject").value="Qelviora Career Application — "+(role.value||"New candidate")}
function updateExperience(){const experienced=experience.value==="Experienced";fields.hidden=!experienced;fields.querySelectorAll("input").forEach(input=>{input.disabled=!experienced;input.required=experienced&&input.name!=="current_ctc"})}
const requested=new URLSearchParams(location.search).get("role");if(roles[requested])role.value=requested;updateRole();updateExperience();
role.addEventListener("change",updateRole);experience.addEventListener("change",updateExperience);
function validateResume(){resume.setCustomValidity("");const file=resume.files?.[0];if(file&&(!/\.(pdf|doc|docx)$/i.test(file.name)||file.size>5*1024*1024))resume.setCustomValidity("Choose a PDF, DOC or DOCX résumé no larger than 5 MB.")}
resume.addEventListener("change",validateResume);
form.addEventListener("submit",event=>{if(location.protocol==="file:"){event.preventDefault();status.textContent="Extract the website ZIP and double-click Launch Website.cmd before submitting. Career applications require a web server.";return}validateResume();if(!form.reportValidity()){event.preventDefault();return}status.textContent="Continuing to the form service to submit your application…";});
})();

