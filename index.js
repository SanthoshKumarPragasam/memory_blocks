function button_press(event){
    $(event.target).addClass("pressed");
    setTimeout(function(){
        $(event.target).removeClass("pressed");
    }, 300);
}


function checkPattern(pattern, i, level, num_blocks){
    if(i<pattern.length){
        $(".btn").on("click", function(event){
            $(".btn").off();
            button_press(event);
            if($(event.target).attr("id") == $(".btn:eq("+pattern[i]+")").attr("id")){
                var audio = new Audio("sounds/"+$(event.target).attr("id")+".mp3");
                audio.play();
                checkPattern(pattern, ++i, level, num_blocks);
            }
            else{
                var audio = new Audio("sounds/wrong.mp3");
                audio.play();
                setTimeout(function(){
                    $("#level-title").text("Score: "+(level-1));
                    $("#over").css("visibility", "visible");
                    $("#exit").on("click", function(){
                    location.reload();
                });
                }, 500);
            }
        });
    }
    else{
        setTimeout(function(){
            $("#alert").css("visibility", "visible");
            $("#alert .msg").text("Level "+level+" Completed!!");
            $("#okay").on("click", function(event){
                $("#okay").off();
                $("#no").off();
                setTimeout(gameSequence2, 500, ++level, ++num_blocks);
                setTimeout(function(){
                    $("#alert").css("visibility", "hidden");
                }, 100);
            })
            $("#no").on("click", function(event){
                $("#okay").off();
                $("#no").off();
                location.reload();
            })
        }, 500);
    }
}

function gameSequence2(level, num_blocks){
    $("#level-title").text("Level: "+level);
    var pattern = [];
    for(var i=0; i<num_blocks; i++){
        pattern.push(Math.floor(Math.random()*4));
    }
    setTimeout(showPattern, 1000, pattern, 0, level, num_blocks);
}




function showPattern(pattern, i, level, num_blocks){
    if(i < pattern.length){
        $(".btn").css("cursor", "none");
        $(".btn:eq("+pattern[i]+")").fadeOut(200).fadeIn(200);
        setTimeout(showPattern, 2000, pattern, ++i, level, num_blocks);
    }
    else{
        $(".btn").css("cursor", "default");
        setTimeout(checkPattern, 100, pattern, 0, level, num_blocks);
    }
    
}


function gameSequence1(event){
    $(".container").css("margin", "0%");
    $("#level-title").css("animation", "none");
    $("#level-title").removeClass("start");
    $("#level-title").text("Level: "+event.data.level);
    var pattern = [];
    for(var i=0; i<event.data.num_blocks; i++){
        pattern.push(Math.floor(Math.random()*4));
    }
    setTimeout(showPattern, 1000, pattern, 0, event.data.level, event.data.num_blocks);
}


$(document).on("keypress", {"level": 1,"num_blocks": 1}, gameSequence1);


