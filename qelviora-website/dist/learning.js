// Original Qelviora lesson flow. No login, XP or stored learner profile.
(()=>{
const root=document.querySelector("#learning-root");if(!root)return;
const params=new URLSearchParams(location.search),skill=window.QELVIORA_LEARNING.find(s=>s.slug===params.get("skill"));
const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
function link(text,href,cls){const a=node("a",text,cls);a.href=href;return a}
if(!skill){root.append(node("h1","Choose a skill to start learning"),node("p","Find a skill in our catalogue and open its learning path."),link("Browse Skills","skills.html","button"));return}
document.title=skill.name+" — "+(location.pathname.endsWith("lesson.html")?"Lesson":"Learning Path")+" | Qelviora Technologies";
root.append(link("All Skills","skills.html","breadcrumb"));
const overview="skill.html?skill="+encodeURIComponent(skill.slug),lessonUrl=i=>"lesson.html?skill="+encodeURIComponent(skill.slug)+"&lesson="+i;
function curriculum(current=0){const list=node("ol",undefined,"lesson-list");skill.lessons.forEach((lesson,i)=>{const li=node("li");const a=link(lesson.title,lessonUrl(i+1));if(i+1===current)a.setAttribute("aria-current","step");const count=node("span",String(i+1).padStart(2,"0"),"lesson-number");a.prepend(count);li.append(a);list.append(li)});return list}
if(!location.pathname.endsWith("lesson.html")){
const header=node("div",undefined,"learning-hero");header.append(node("p",skill.category.toUpperCase()+" / 6 INTRODUCTORY LESSONS","eyebrow"),node("h1",skill.name),node("p",skill.description,"intro"));const actions=node("div",undefined,"actions");actions.append(link("Start Learning",lessonUrl(1),"button"),link("Get Training Guidance","contact.html?type=General&interest=General%20enquiry&message="+encodeURIComponent("I would like training guidance for "+skill.name)+"#enquiry","button outline"));header.append(actions);
const layout=node("div",undefined,"learning-layout"),path=node("div",undefined,"learning-path"),aside=node("aside",undefined,"learning-aside");path.append(node("h2","Your learning path"),curriculum());aside.append(node("p","PRACTICAL PROJECT","eyebrow"),node("h3","Put the ideas into practice"),node("p",skill.project),node("p","Read a lesson, try its practice step, and use the final self-check to review your understanding. These introductory lessons do not award an issued certificate.","fine"));layout.append(path,aside);root.append(header,layout);return}
const raw=Number(params.get("lesson")||1),index=Number.isInteger(raw)&&raw>=1&&raw<=6?raw:1,lesson=skill.lessons[index-1];
const layout=node("div",undefined,"learning-layout lesson-layout"),aside=node("aside",undefined,"lesson-sidebar"),article=node("article",undefined,"lesson-content");
aside.append(link(skill.name,overview,"course-back"),node("p","LESSON "+index+" OF 6","eyebrow"),curriculum(index));
article.append(node("p",skill.name.toUpperCase()+" / LESSON "+index,"eyebrow"),node("h1",lesson.title),node("p",lesson.explanation,"lesson-explanation"));
const practice=node("div",undefined,"lesson-practice");practice.append(node("h3","Try it yourself"),node("p",lesson.exercise),node("p","Project context: "+skill.project));article.append(practice);
const notesLabel=node("label","Your practice notes (optional)");const notes=node("textarea");notes.rows=4;notes.maxLength=3000;notes.placeholder="Write what you tried, observed or want to clarify.";notesLabel.append(notes);article.append(notesLabel,node("p","Practice notes stay on this page and are not saved. Copy anything you want to keep before leaving.","fine"));
if(index===6){const check=node("section",undefined,"lesson-check");check.append(node("h3","Self-check"),node("p",skill.question));const answer=node("details");answer.append(node("summary","Show suggested answer"),node("p",skill.answer));check.append(answer);article.append(check)}
const buttons=node("div",undefined,"lesson-navigation");if(index>1)buttons.append(link("Previous Lesson",lessonUrl(index-1),"button outline"));else buttons.append(link("Learning Path",overview,"button outline"));if(index<6)buttons.append(link("Next Lesson",lessonUrl(index+1),"button"));else buttons.append(link("Explore Another Skill","skills.html","button"));article.append(buttons);layout.append(aside,article);root.append(layout);
})();

