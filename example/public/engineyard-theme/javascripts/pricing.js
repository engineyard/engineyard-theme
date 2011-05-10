// Pricing Calculator // scott leonard  // 06.2009 // zero@botfarm.com
var pricing = {
    
    plan: {
        usEast: {
          unitPrice: [0.120, 0.470, 0.930, 0.230, 0.930, 0.690, 1.370, 2.740], 
          computeHoursMultiple: 720,
          ebsStorageIo: 0.10,
          ebsStorage: 0.10,
          s3Space: 0.14,
          s3XferIn: 0.10,
          s3XferOut: 0.15, 
          s3Puts: 0.01,
          s3Gets: 0.01,
          bandwidthIn: 0.10,
          bandwidthOut: 0.15  
        },
        usWest: {
          unitPrice: [0.20, 0.470, 0.930, 0.230, 0.930, 0.690, 1.370, 2.740], 
          computeHoursMultiple: 720,
          ebsStorageIo: 0.11,
          ebsStorage: 0.11,
          s3Space: 0.154,
          s3XferIn: 0.10,
          s3XferOut: 0.15, 
          s3Puts: 0.011,
          s3Gets: 0.011,
          bandwidthIn: 0.10,
          bandwidthOut: 0.15  
        },
        europe: {
          unitPrice: [0.20, 0.470, 0.930, 0.230, 0.930, 0.690, 1.370, 2.740], 
          computeHoursMultiple: 720,
          ebsStorageIo: 0.11,
          ebsStorage: 0.11,
          s3Space: 0.14,
          s3XferIn: 0.10,
          s3XferOut: 0.15, 
          s3Puts: 0.01,
          s3Gets: 0.01,
          bandwidthIn: 0.10,
          bandwidthOut: 0.15  
        },
        apac: {
          unitPrice: [0.20, 0.470, 0.930, 0.230, 0.930, 0.690, 1.370, 2.740], 
          computeHoursMultiple: 720,
          ebsStorageIo: 0.11,
          ebsStorage: 0.11,
          s3Space: 0.14,
          s3XferIn: 0.10,
          s3XferOut: 0.19, 
          s3Puts: 0.01,
          s3Gets: 0.01,
          bandwidthIn: 0.10,
          bandwidthOut: 0.15  
        },
        japan: {
          unitPrice: [0.20, 0.470, 0.930, 0.230, 0.930, 0.690, 1.370, 2.740], 
          computeHoursMultiple: 720,
          ebsStorageIo: 0.12,
          ebsStorage: 0.12,
          s3Space: 0.15,
          s3XferIn: 0.10,
          s3XferOut: 0.15, 
          s3Puts: 0.01,
          s3Gets: 0.01,
          bandwidthIn: 0.10,
          bandwidthOut: 0.15  
        }
    },

    // support pricing
    standardSupportTier: [275, 375, 575, 975, 2150],
    additionalStandardSupport: 425,
    premiumSupportTier: [475, 625, 975, 1675, 3575],
    additionalPremiumSupport: 725,

    // slider limits
    maxPageviews: 1000000,
    maxPagesize: 2000,

    
    
    init: function() {
                            
        pricing.region = 'usEast';
        pricing.planMin = 0;
        pricing.totalServers = 0;
        pricing.maxServers = 20;  
        
        $('#region').change(function(){
          pricing.updateRegion(this.value);
        })

        $('#servers .minus').click(function() { 
            var input = $(this).parent().children('input');
            var newValue = parseInt(input.val()) - 1;
            input.val(newValue);
            pricing.update();
        });

        $('#servers .plus').click(function() { 
            var input = $(this).parent().children('input');
            var newValue = parseInt(input.val()) + 1;
            input.val(newValue);
            pricing.update();
        });

        $('#servers input').change(function() { 
            pricing.update() 
        });

        $("input[name='support_group']").change(function() { 
            pricing.update() 
        });
        
        $('#pageviews_widget').slider({
            value: 1000,
            min: 0,
            max: pricing.maxPageviews,
            step: 10000,
            slide: function(event, ui) {
                $('#pageviews').val(pricing.formatValue(ui.value));
            },
            change: pricing.update,
            animate: true
        });
        
        $('#pagesize_widget').slider({
            value: 300,
            min: 0,
            max: pricing.maxPagesize,
            step: 100,
            slide: function(event, ui) {
                $('#pagesize').val(pricing.formatValue(ui.value) + 'Kbs');
            },
            change: pricing.update,
            animate: true
        });
        
        $('#total_backups_widget').slider({
            value: 1,
            min: 1,
            max: 30,
            step: 1,
            slide: function(event, ui) {
                $('#total_backups').val(ui.value);
            },
            change: pricing.update,
            animate: true
        });
        
        $('#backup_frequency_widget').slider({
            value: 0,
            min: 0,
            max: 5,
            step: 1,
            slide: function(event, ui) {
                if (ui.value == 5) { $('#backup_frequency').val('every hour')}
                else if (ui.value == 4) { $('#backup_frequency').val('every 2 hours')}
                else if (ui.value == 3) { $('#backup_frequency').val('every 6 hours')}
                else if (ui.value == 2) { $('#backup_frequency').val('twice a day')}
                else if (ui.value == 1) { $('#backup_frequency').val('once a day')}
                else if (ui.value == 0) { $('#backup_frequency').val('never')}
            },
            change: pricing.update,
            animate: true
        });
        pricing.update();
                   
    },
    
    update: function() {
        $('#console').html('');
        
        var count = 0;        
        $('#servers input').each( function(i) {
            if (pricing.totalServers > pricing.maxServers) { $(this).val(0) }
            else {
              count = count + parseInt($(this).val());
              
              // Debugging
              // debug.writeServers(parseInt($(this).val()));
            } 

            if ($(this).val() != 0) { $('#servers .minus')[i].disabled = false }
            else { $('#servers .minus')[i].disabled = true }

        });
        
        if ($('#backup_frequency_widget').slider('value') <= 0){
          $('#total_backups_widget').slider('disable');
          $('#total_backups_widget').fadeTo('slow', 0.4);
        } else {
          $('#total_backups_widget').slider('enable');
          $('#total_backups_widget').fadeTo('slow', 1);
        }

        pricing.totalServers = count;
        $('#servers_remaining').html(count);

        // $('#servers_remaining').html(pricing.maxServers - count);
           
        if (count == pricing.maxServers) { $('#servers .plus').attr('disabled', true) }
        else { $('#servers .plus').attr('disabled', false) }
        
        // caclulate total
        var prices = pricing.plan[pricing.region];
        

        
        var total = 0;
        var totalComputeHours = pricing.totalServers * prices.computeHoursMultiple;
        var standardSupportTotal = 0;
        var premiumSupportTotal = 0;    
        
        $('input.number').each(function(i) {
           total += parseInt($(this).val()) * 720 * prices.unitPrice[i]; 
        });

        if (pricing.totalServers) {

            var s3Xfer = 14;
            var bwidth = 10;
            var per24hours = [0,1,2,6,12,24];
            var backupFreq = per24hours[$('#backup_frequency_widget').slider('value')]
            var pageviews = $('#pageviews').val().replace(/\$|\,/g,'')
            var pagesize = $('#pagesize').val().replace(/\$|\,/g,'')         
            
            if (parseInt($('#total_backups').val()) <= 0 || backupFreq <= 0) {
              var ebsStorageIO = 0;
            } else {
              if (parseInt(pageviews) <= 0) {
                var ebsStorageIO = (parseInt(Math.log(1)) * (parseInt(pagesize) / 300) * (Math.log(backupFreq * parseInt($('#total_backups').val()))) ) / 1.5 + 1;
              }
              else {
                var ebsStorageIO = (parseInt(Math.log(pageviews)) * (parseInt(pagesize) / 300) * (Math.log(backupFreq * parseInt($('#total_backups').val()))) ) / 1.5 + 1;
              }
            }
            
            if (parseInt(pageviews) > 0) {
              var bandwidthIn = (parseInt(pagesize) / 300) * (parseInt(Math.sqrt(pageviews)) / 10)
            } else {
              var bandwidthIn = 0;
            }

            var ebsStorage = ebsStorageIO / 5;
            var s3Space = ebsStorage / 2;
            var s3In = ebsStorageIO / 6;
            var s3Out = ebsStorageIO / 20;
            var s3Puts = backupFreq * 6;
            var s3Gets = backupFreq;
            var bandwidthOut = bandwidthIn * 10;

            total += ebsStorage * prices.ebsStorage;
            total += ebsStorageIO * prices.ebsStorageIo;
            total += s3Space * prices.s3Space;
            total += s3In * prices.s3XferIn;
            total += s3Out * prices.s3XferOut;
            total += s3Puts * prices.s3Puts;
            total += s3Gets * prices.s3Gets;
            total += bandwidthIn * prices.bandwidthIn;
            total += bandwidthOut * prices.bandwidthOut;
                                  
            var supportTier = 0;
            var additionalSupport = 0;
            if (totalComputeHours > 2500 && totalComputeHours <= 5000) supportTier = 1;
            else if (totalComputeHours > 5000 && totalComputeHours <= 10000) supportTier = 2;
            else if (totalComputeHours > 10000 && totalComputeHours <= 20000) supportTier = 3;
            else if (totalComputeHours > 20000  && totalComputeHours <= 50000) supportTier = 4;
            else if (totalComputeHours > 50000) {
                supportTier = 4;
                additionalSupport = (totalComputeHours - 50000) / 10000;
            }
            standardSupportTotal = pricing.standardSupportTier[supportTier];
            premiumSupportTotal = pricing.premiumSupportTier[supportTier];
       
        }
        
        // Calculate Minimum
        
        if(total < pricing.planMin){
          standardSupportTotal = pricing.standardSupportTier[0];
          total = pricing.planMin;
          $('#total p').html('*monthly<br/>minimum')
        } else {
          $('#total p').html('');
        }
 
        
        // Updates Support Tier prices
        var selected_support = $("input[name='support_group']:checked").val();
        var supportTotal = 0;
        
        if (pricing.totalServers > 0) {
          $('#standard_support_total').html(pricing.formatTotal(standardSupportTotal) + " Month");
          $('#premium_support_total').html(pricing.formatTotal(premiumSupportTotal) + " Month");
          if (selected_support == 'standard') { supportTotal = standardSupportTotal }
          else if (selected_support == 'premium') { supportTotal = premiumSupportTotal }
        } else {
          $('#standard_support_total').html("&mdash;");
          $('#premium_support_total').html("&mdash;");
        }
        $('#total #estimate').html(pricing.formatTotal(total + supportTotal));

    },
    
    updateRegion: function(value) {
      pricing.region = value;
      pricing.update();
    },
    
    formatTotal: function(strValue) {
        
    	strValue = strValue.toString().replace(/\$|\,/g,'');
    	dblValue = parseFloat(strValue);

    	blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
    	dblValue = Math.floor(dblValue*100+0.50000000001);
    	intCents = dblValue%100;
    	strCents = intCents.toString();
    	dblValue = Math.floor(dblValue/100).toString();
    	if(intCents<10)
    		strCents = "0" + strCents;
    	for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
    		dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
    		dblValue.substring(dblValue.length-(4*i+3));
    	return (((blnSign)?'':'-') + '$' + dblValue + '.' + strCents);
    },
    
    formatValue: function(strValue) {
      strValue = strValue.toString().replace(/\$|\,/g,'');
      dblValue = parseFloat(strValue);
      blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
      dblValue = Math.floor(dblValue*100);
      
      intCents = dblValue%100;
      strCents = intCents.toString();
      dblValue = Math.floor(dblValue/100).toString();
      
      for (var i=0 ; i < Math.floor((dblValue.length-(1+i))/3); i++) {
        dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+dblValue.substring(dblValue.length-(4*i+3));
      }
      return (((blnSign)?'':'-') + dblValue);
    }
}

var estimator = {
  serverName: ["Small", "Medium", "Large"],
  serverPrice: [0.12, 0.230, 0.470],
  computeHours: 720,
  maxServers: 20,
  priceAdj: 1.075,

  select_default: function() {
    units = 1;
    database = 0;        
    $("#server_size input[name='server_size']:checked").val(1);
    $('#dedicated_db').removeAttr('checked');
    estimator.update();
  },
  
  init: function() {
    $('#estimator input').change(function(){
      if ($('#servers').val() > estimator.maxServers) {
        units = estimator.maxServers;
        $('#servers').val(units);
      } else {
        units = $('#servers').val();
      }
      if($('#dedicated_db:checked').val()) database = 1;
      else database = 0;
      $('#configuration li').removeClass('selected');
      estimator.update();
    }),

    // Only allow numbers in the servers text field
    $('#servers').keydown(function(event){
  		// Allow only backspace and delete
  		if (event.keyCode == 46 || event.keyCode == 8  || event.keyCode == 9) {
      // let it happen, don't do anything
      } else {
        // Ensure that it is a number and stop the keypress
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        } else {
          event.preventDefault();
        }
      }
    }),
    
    $('#shared').click(function(){
      units = 1;
      database = 0;
      $('#dedicated_db').removeAttr('checked');
      estimator.update(true);
    }),

    $('#dedicated').click(function(){
      units = 1;
      database = 1;
      $('#dedicated_db').attr('checked', 'checked');
      estimator.update(true);
    }),

    $('#cluster').click(function(){
      units = 2;
      database = 1;
      $('#dedicated_db').attr('checked', 'checked');
      estimator.update(true);
    }),

    $('#configuration li').click(function(){
      $(this).parent().children('li').removeClass("selected");
      $(this).addClass("selected");
    }),
    
    $('.preset').click(function(){
      $(this).addClass('selected');
      $('.custom').removeClass('selected');
      $('.price_sheet').removeClass('selected');
      $('.faqs').removeClass('selected');
      $('#configuration').removeClass('hidden');
      $('#price_sheet').addClass('hidden');
      $('#faqs').addClass('hidden');
      $('#customize').addClass('hidden');
    }),
    $('.custom').click(function(){
      $(this).addClass('selected');
      $('.preset').removeClass('selected');
      $('.price_sheet').removeClass('selected');
      $('.faqs').removeClass('selected');
      $('#configuration').addClass('hidden');
      $('#price_sheet').addClass('hidden');
      $('#faqs').addClass('hidden');
      $('#customize').removeClass('hidden');
    }),
    $('.price_sheet').click(function(){
      $(this).addClass('selected');
      $('.preset').removeClass('selected');
      $('.custom').removeClass('selected');
      $('.faqs').removeClass('selected');
      $('#configuration').addClass('hidden');
      $('#customize').addClass('hidden');
      $('#faqs').addClass('hidden');
      $('#price_sheet').removeClass('hidden');
    })
    $('.faqs').click(function(){
      $(this).addClass('selected');
      $('.preset').removeClass('selected');
      $('.custom').removeClass('selected');
      $('.price_sheet').removeClass('selected');
      $('#configuration').addClass('hidden');
      $('#customize').addClass('hidden');
      $('#price_sheet').addClass('hidden');
      $('#faqs').removeClass('hidden');
    })
  },
  update_ui: function() {
    $('#servers').val(units);
    $('#small_server').attr('checked', 'checked');
  },
  
  // Get total
  update: function(preconfig) {
    if(preconfig) estimator.update_ui();
    
    var serverSize = $("#server_size input[name='server_size']:checked").val();
    var serverCosts = (estimator.serverPrice[serverSize] * units) + (estimator.serverPrice[serverSize] * database);
    var monthlyCosts = serverCosts * estimator.computeHours;
    var total = monthlyCosts * estimator.priceAdj;
    
    $('#total').html(estimator.formatTotal(total));
    
    // Updating cost details
    $('.detail_server_count').html(units);
    $('.detail_server_size').html(estimator.serverName[serverSize]);
    $('.detail_server_cost').html(estimator.serverPrice[serverSize] * 100);
    $('.server_subtotal').html(estimator.formatTotal(estimator.serverPrice[serverSize] * units * estimator.computeHours));
    $('.db_server_count').html(database);
    $('.db_subtotal').html("+ " + estimator.formatTotal(estimator.serverPrice[serverSize] * database * estimator.computeHours));
    $('.priceAdj').html("+ " + estimator.formatTotal(monthlyCosts * (estimator.priceAdj - 1)));
    if(database != 0) { $('.has_db').html("+ 1 " + estimator.serverName[serverSize] + " dedicated database instance"); } else { $('.has_db').html("");};
  },

  // Format total
  formatTotal: function(strValue) {
  	strValue = strValue.toString().replace(/\$|\,/g,'');
  	dblValue = parseFloat(strValue);

  	blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
  	dblValue = Math.floor(dblValue*100+0.50000000001);
  	intCents = dblValue%100;
  	strCents = intCents.toString();
  	dblValue = Math.floor(dblValue/100).toString();
  	if(intCents<10)
  		strCents = "0" + strCents;
  	for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
  		dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
  		dblValue.substring(dblValue.length-(4*i+3));
  	return (((blnSign)?'':'-') + '$' + dblValue + '.' + strCents);
  }
};
