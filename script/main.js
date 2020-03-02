// variables
var limit;
var buttonsValues;
var barsValue;
var m;

var sel, selectedProgress;
//fetch data
fetch("https://pb-api.herokuapp.com/barsValue")
    .then((res) => res.json())
    .then(function(data) {
        buttonsValues = data.buttons;
        barsValue = data.bars;
        limit = data.limit;

        //buttons 
        for (let i = 0; i < buttonsValues.length; i++) {
            let btn = document.createElement("button");
            btn.innerHTML = buttonsValues[i];
			if(buttonsValues[i] > 0) {
				btn.className = "btn btn-success";
			} else {
				btn.className = "btn btn-danger";
			}
            btn.setAttribute("onclick", "buttonClick(" + buttonsValues[i] + ")");
            let btnSection = document.getElementById("btnSection");
            btnSection.appendChild(btn);
        }

        //bars 
		localStorage.removeItem('btn');
        for (let i = 0; i < barsValue.length; i++) {
            let div = document.createElement("div");
            div.className = "progress";
            let divProgressbar = document.createElement("div");
            divProgressbar.className = "progress-bar bg-danger progress-bar-animated progress-bar-striped";
            divProgressbar.setAttribute("id", "progressbar" + [i]);
            divProgressbar.setAttribute("role", "progressbar");
            divProgressbar.setAttribute("style", "width:" + (barsValue[i]/limit * 100) + "%");

            div.appendChild(divProgressbar);

            let barSection = document.getElementById("barSection");
            barSection.appendChild(div);
        }

        //select option 
        let select = document.getElementById("select");
        select.className = "form-control";
        for (let i = 0; i < barsValue.length; i++) {
            let opt = document.createElement('option');
            opt.value = "prg" + i;
            opt.innerHTML = "progress " + i;
            select.appendChild(opt);
        }
        let selectSection = document.getElementById("selectSection");
        selectSection.appendChild(select);

        selectOption();
        
		if (window.localStorage.getItem('btn') !== null && m > 0) {
			m = parseInt(window.localStorage.getItem('btn')) + m;
			
			buttonClick(m);
			
		}

    })


function buttonClick(m) {
    
	if (window.localStorage.getItem('btn') !== null && m > 0) {
		m = parseInt(window.localStorage.getItem('btn')) + m;	
	}
    if (m > 0) {
        if (m <= limit) {
            if (selectedProgress === 'prg0') {
                positiveBarValue('progressbar0', m);
                overLimitColorChange('progressbar0');
            } else if (selectedProgress === 'prg1') {
                positiveBarValue('progressbar1', m);
                overLimitColorChange('progressbar1');
            } else if (selectedProgress === 'prg2') {
                positiveBarValue('progressbar2', m);
                overLimitColorChange('progressbar2');
            } else {
                positiveBarValue('progressbar3', m);
                overLimitColorChange('progressbar3');
            }
        }
    } else {
        if (selectedProgress === 'prg0') {
            negativeBarValue('progressbar0', m);
            overLimitColorChange('progressbar0');
        } else if (selectedProgress === 'prg1') {
            negativeBarValue('progressbar1', m);
            overLimitColorChange('progressbar1');
        } else if (selectedProgress === 'prg2') {
            negativeBarValue('progressbar2', m);
            overLimitColorChange('progressbar2');
        } else {
            negativeBarValue('progressbar3', m);
            overLimitColorChange('progressbar3');
        }
    }

}

function selectOption() {
    sel = document.getElementById("select");
    selectedProgress = sel.options[sel.selectedIndex].value;
}

sel = document.getElementById("select");
sel.onchange = function selectOption() {
    localStorage.removeItem('btn');
    selectedProgress = sel.options[sel.selectedIndex].value;
}


var splitValue, initialValue;

function overLimitColorChange(progressbar) {
    splitValue = document.getElementById(progressbar).style.width.split("%")[0];
    if (splitValue >= 100) {
        document.getElementById(progressbar).style.backgroundColor = 'red';
    } else {
        document.getElementById(progressbar).style.backgroundColor = '#337ab7';
    }
}

// positive bar value
function positiveBarValue(progressbar, btnValue) {
	if (window.localStorage.getItem('btn') !== null) {
		document.getElementById(progressbar).style.width =  parseInt(btnValue) + "%";
	} else {
		initialValue = document.getElementById(progressbar).style.width.split("%")[0];
		document.getElementById(progressbar).style.width = parseInt(initialValue) + parseInt(btnValue) + "%";
	}
    window.localStorage.setItem('btn', document.getElementById(progressbar).style.width);
}

//negative bar value
function negativeBarValue(progressbar, btnValue) {
    document.getElementById(progressbar).style.width = (parseInt(document.getElementById(progressbar).style.width) + btnValue > 0) ? parseInt(document.getElementById(progressbar).style.width) + btnValue + "%" : 0;
    window.localStorage.setItem('btn', document.getElementById(progressbar).style.width);
}