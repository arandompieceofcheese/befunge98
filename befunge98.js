var examples = [
    { name: "Hello World!", code: '"!dlrow olleH">:#,_@' },
    { name: "Quine", code: ":0g,:93+`#@_1+" }
];
window.addEventListener("load", function() {
    var exampleSelect = document.querySelector("#examples");
    for (var i = 0; i < examples.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = examples[i].name;
        exampleSelect.appendChild(option);
    }
    exampleSelect.addEventListener("change", function() {
        if (exampleSelect.selectedIndex > 0) {
            document.querySelector("#code").value = examples[exampleSelect.selectedIndex - 1].code;
            exampleSelect.selectedIndex = 0;
        }
    });
    exampleSelect.selectedIndex = 0;
    var storeStringValue = function(name, value) {
        console.log(Array.from(value).map(e=>e.charCodeAt()).reduce((a,b)=>a.includes(b)?a:a.concat([b]).sort(),[]));
        alert("stored " + name + ":\n" + btoa(value));
        localStorage.setItem("jsfunge98_" + name, btoa(value));
    };
    var fileChooser = document.querySelector("#file");
    document.querySelector("#open-file").addEventListener("click", function() {
        fileChooser.click();
    });
    fileChooser.addEventListener("change", function() {
        var file = fileChooser.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.addEventListener("load", function() {
            var code = document.querySelector("#code").value = reader.result.replace(/\r\n?/g, "\n");
            storeStringValue("code", code);
            filename = file.name;
            if (engine !== null)
                engine.filename = filename;
        });
        reader.readAsText(file);
    });
    var codingArea = document.querySelector("#coding"), executionArea = document.querySelector("#execution");
    var actualHide = function(e) {
        if (window.getComputedStyle(e.target).opacity === "0")
            e.target.style.display = "none";
    };
    codingArea.addEventListener("transitionend", actualHide);
    executionArea.addEventListener("transitionend", actualHide);
    var filename = "online.b98", engine = null, delay = false, delayMs = 500, interactive = true, extraArgs = false, output = "", inputFocusInterval = 0;
    var setupEngine = function() {
        var code = document.querySelector("#code").value;
        var input = document.querySelector("#input").value;
        document.querySelector("#run").style.display = "inline-block";
        document.querySelector("#step").style.display = "inline-block";
        document.querySelector("#pause").style.display = "none";
        engine = new BefungeEngine(code, interactive ? null : input);
        engine.delayOn = delay;
        engine.delay = delayMs;
        engine.filename = filename;
        var extraArgList = document.querySelector("#args").value;
        engine.extraArguments = extraArgList.length === 0 ? [] : extraArgList.split("\n");
        engine.outputCallback = function(text) {
            output += text;
            document.querySelector("#output").innerHTML = output;
        };
        engine.updateCallback = function() {
            if (engine.keepRunning) {
                document.querySelector("#run").style.display = "none";
                document.querySelector("#step").style.display = "none";
                document.querySelector("#pause").style.display = "inline-block";
            } else {
                document.querySelector("#run").style.display = "inline-block";
                document.querySelector("#step").style.display = "inline-block";
                document.querySelector("#pause").style.display = "none";
            }
        };
    };
    var clearExecution = function() {
        engine.stop();
        engine.outputCallback = function(text) {};
        output = "";
        document.querySelector("#output").innerHTML = "";
    };
    var updateInteractiveArea = function() {
        var checkIcon = document.querySelector("#interactive span");
        var inputArea = document.querySelector("#input-area");
        var interactiveInputArea = document.querySelector("#interactive-input");
        if (interactive) {
            checkIcon.classList.remove("fa-square");
            checkIcon.classList.add("fa-check-square");
            inputArea.style.display = "none";
            interactiveInputArea.style.display = "inline";
        } else {
            checkIcon.classList.remove("fa-check-square");
            checkIcon.classList.add("fa-square");
            inputArea.style.display = "block";
            interactiveInputArea.style.display = "none";
        }
    };
    var updateArgumentsArea = function() {
        var checkIcon = document.querySelector("#extra-args span");
        var argsArea = document.querySelector("#args-area");
        if (extraArgs) {
            checkIcon.classList.remove("fa-square");
            checkIcon.classList.add("fa-check-square");
            argsArea.style.display = "block";
        } else {
            checkIcon.classList.remove("fa-check-square");
            checkIcon.classList.add("fa-square");
            argsArea.style.display = "none";
        }
    };
    var updateDelayButton = function() {
        var checkIcon = document.querySelector("#delay span");
        if (delay) {
            checkIcon.classList.remove("fa-square");
            checkIcon.classList.add("fa-check-square");
            delayAmount.parentNode.style.width = "8ch";
            delayAmount.parentNode.style.marginRight = "5px";
        } else {
            checkIcon.classList.remove("fa-check-square");
            checkIcon.classList.add("fa-square");
            delayAmount.parentNode.style.width = "0";
            delayAmount.parentNode.style.marginRight = "0";
        }
    };
    document.querySelector("#delay-ms").addEventListener("change", function () {
        var newDelay = parseInt(document.querySelector("#delay-ms").value);
        if (!isNaN(newDelay) && newDelay > 0)
            delayMs = newDelay;
        localStorage.setItem("jsfunge98_debugdelay", delayMs.toString());
        if (engine !== null)
            engine.delay = newDelay;
    });
    [].slice.call(document.querySelectorAll("#code, #input")).forEach(function(e) {
        e.addEventListener("change", function(e) {
            storeStringValue(e.target.id, e.target.value);
        });
    });
    document.querySelector("#clear").addEventListener("click", function() {
        document.querySelector("#code").value = "";
        document.querySelector("#input").value = "";
        document.querySelector("#args").value = "";
    });
    document.querySelector("#go").addEventListener("click", function() {
        setupEngine();
        codingArea.style.opacity = 0;
        codingArea.style.zIndex = 1;
        executionArea.style.opacity = 1;
        executionArea.style.display = "block";
        executionArea.style.zIndex = 2;
        inputFocusInterval = setInterval(function() {
            if (interactive) {
                document.querySelector("#interactive-input").focus();
            }
        }, 100);
    });
    document.querySelector("#back").addEventListener("click", function() {
        clearExecution();
        if (inputFocusInterval !== 0)
            clearInterval(inputFocusInterval);
        executionArea.style.opacity = 0;
        executionArea.style.zIndex = 1;
        codingArea.style.opacity = 1;
        codingArea.style.display = "block";
        codingArea.style.zIndex = 2;
    });
    var delayAmount = document.querySelector("#delay-ms");
    document.querySelector("#delay").addEventListener("click", function() {
        delay = !delay;
        localStorage.setItem("jsfunge98_debugdelayon", delay.toString());
        updateDelayButton();
        if (engine !== null)
            engine.delayOn = delay;
    });
    document.querySelector("#interactive").addEventListener("click", function() {
        interactive = !interactive;
        localStorage.setItem("jsfunge98_interactive", interactive.toString());
        updateInteractiveArea();
    });
    document.querySelector("#extra-args").addEventListener("click", function() {
        extraArgs = !extraArgs;
        localStorage.setItem("jsfunge98_extraargs", extraArgs.toString());
        updateArgumentsArea();
    });
    document.querySelector("#reset").addEventListener("click", function() {
        clearExecution();
        setupEngine();
    });
    document.querySelector("#run").addEventListener("click", function() {
        if (engine.finished) {
            clearExecution();
            setupEngine();
        }
        document.querySelector("#run").style.display = "none";
        document.querySelector("#step").style.display = "none";
        document.querySelector("#pause").style.display = "inline-block";
        engine.run();
    });
    document.querySelector("#pause").addEventListener("click", function() {
        document.querySelector("#pause").style.display = "none";
        document.querySelector("#run").style.display = "inline-block";
        document.querySelector("#step").style.display = "inline-block";
        engine.stop();
    });
    document.querySelector("#step").addEventListener("click", function() {
        if (engine.finished) {
            clearExecution();
            setupEngine();
        }
        engine.step();
    });
    var storedCode = localStorage.getItem("jsfunge98_code");
    if (storedCode !== null)
        document.querySelector("#code").value = atob(storedCode);
    var storedInput = localStorage.getItem("jsfunge98_input");
    if (storedInput !== null)
        document.querySelector("#input").value = atob(storedInput);
    var storedDelay = parseInt(localStorage.getItem("jsfunge98_debugdelay"));;
    if (storedDelay !== null && !isNaN(storedDelay))
        delayMs = storedDelay;
    document.querySelector("#delay-ms").value = delayMs;
    delay = localStorage.getItem("jsfunge98_debugdelayon") === "true";
    updateDelayButton();
    interactive = localStorage.getItem("jsfunge98_interactive") !== "false";
    updateInteractiveArea();
    extraArgs = localStorage.getItem("jsfunge98_extraargs") === "true";
    updateArgumentsArea();
});
