
document.addEventListener("DOMContentLoaded", () =>{
	let mouse = document.querySelector(".custome");
	let click = document.querySelector(".click");
	mouse.style.display="none";
	this.addEventListener('mousemove', (e)=>{
		mouse.style.display="block";

	let X = e.clientX;
	let Y = e.clientY;
	let left = 	mouse.style.left = X -14+'px';
	let clickLeft = 	click.style.left = X -11+'px';
	let top = mouse.style.top = Y-5+'px';
	let clickTop = click.style.top = Y-10+'px';

	this.addEventListener('click',()=>{
		click.style.animation = "click 200ms"
		click.style.visibility = "visible"
		setTimeout(()=>{
			click.style.animation = "none"
			click.style.visibility = "hidden"
		},200)
	})

	});
		this.addEventListener("mouseout", function(e) {
			if(!e.relatedTarget){
			mouse.style.display="none";


			}else{
				mouse.style.display ="block";

			}
		});


});


