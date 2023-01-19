var today = dayjs().format('DD/MM/YYYY, h:mm a');

$(document).ready(function () {

    $('#currentDay').text('Current date/time: ' + today);
    //parses local storage and fills page with data on load.
    for(x = 9; x < 16; x++) {
        if(localStorage.getItem(x) !== null) {
            storageData = JSON.parse(localStorage.getItem(x));
            
            $('#' + x).children('textarea')[0].value = storageData.value;
        }

    }
    
    
    // applies proper coloring on page load to determine if time block is in past present or future.
    for(x = 9; x < 16; x++){
        if(dayjs().isBefore(dayjs().hour(x))){
            $(`#${x}`).addClass('future').removeClass('past').removeClass('present');
        }else if(dayjs().isSame(dayjs().hour(x))){
            $(`#${x}`).addClass('present').removeClass('past').removeClass('future');
        }else{ 
            $(`#${x}`).addClass('past').removeClass('present').removeClass('future');
        }
        
    }
    
    
        
        
    // save button functionality; saves data in text area to local storage 
    $(".saveBtn").on('click', function() {
        var hour = $(this).parent().attr('id');
        var text = $(this).siblings('textarea').val();

        var dataObj = {
            
            value: text
            
        }
        localStorage.setItem(hour, JSON.stringify(dataObj));
        $('#saved').css('visibility', 'visible');
        setTimeout(() => {
            $('#saved').css('visibility', 'hidden');
        }, 1000);

    })    
    
});
