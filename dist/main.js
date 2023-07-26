(()=>{"use strict";function e(e,t,n,o){this.title=e,this.description=t,this.priority=n,this.dueDate=o,this.completed=!1}document.addEventListener("DOMContentLoaded",(()=>{const t=[],n=document.createElement("div");n.innerHTML='\n    <h1>Todo List</h1>\n    <input type="text" id="todoInput" placeholder="Enter your todo">\n    <input type="text" id="todoDescription" placeholder="Enter todo description">\n    <input type="date" id="todoDueDate"> \x3c!-- Use type="date" for the due date --\x3e\n    <select id="todoPriority">\n      <option value="low">Low</option>\n      <option value="medium">Medium</option>\n      <option value="high">High</option>\n    </select>\n    <button id="addTodoBtn">Add Todo</button>\n    <ul id="todoList"></ul>\n  ';const o=n.querySelector("#todoInput"),i=n.querySelector("#todoDescription"),d=n.querySelector("#todoDueDate"),a=n.querySelector("#todoPriority"),r=n.querySelector("#addTodoBtn"),c=n.querySelector("#todoList");function p(){c.innerHTML="",t.forEach((e=>{const t=document.createElement("li");t.innerHTML=`\n        <input type="checkbox" ${e.completed?"checked":""}>\n        <span>${e.title}</span>\n        <span>${e.description}</span>\n        <span>Priority: ${e.priority}</span>\n        <span>Due Date: ${e.dueDate}</span> \x3c!-- Display the due date --\x3e\n      `;const n=document.createElement("button");n.textContent="Clear",n.addEventListener("click",(()=>l(e))),t.appendChild(n),c.appendChild(t)}))}function l(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1),p()}c.addEventListener("change",(function(e){const n=e.target,o=n.parentElement.querySelector("span").textContent.trim(),i=t.find((e=>e.title===o));i&&(i.completed=n.checked,p())})),r.addEventListener("click",(function(){const n=o.value.trim(),r=i.value.trim(),p=d.value.trim(),u=a.value;if(""===n)return void alert("Please enter a valid todo title.");if(""===r)return void alert("Please enter a valid todo description.");if(""===p)return void alert("Please enter a valid due date.");const s=new e(n,r,u,p);t.push(s),function(e){const t=document.createElement("li");t.innerHTML=`\n      <input type="checkbox">\n      <span>${e.title}</span>\n      <span>${e.description}</span>\n      <span>Priority: ${e.priority}</span>\n      <span>Due Date: ${e.dueDate}</span>\n    `;const n=document.createElement("button");n.textContent="Clear",n.addEventListener("click",(()=>l(e))),t.appendChild(n),c.appendChild(t)}(s),o.value="",i.value="",d.value=""})),p(),document.getElementById("content").appendChild(n)}))})();