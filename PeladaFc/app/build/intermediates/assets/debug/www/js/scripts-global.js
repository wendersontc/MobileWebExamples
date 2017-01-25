 var db = null;
 
 var vsql='';
 var vtbl_posicao=0;
 var vtbl_local=0;
 var vtbl_juiz=0;
 var vtbl_time=0;
 var vtbl_jogador=0;
 var vtbl_jogador_time=0
 var vtbl_evento=0;
 var vtbl_jogos=0;
 var vtbl_jogos_acao=0;
 var vtbl_jogos_vermelho=0;

 var fazSomenteQueChamar=0;
 var MostraMensagemCarga=0;
 var OrigemPagina='';
 var filtraId_Jogo='';
 var filtraVermelho=''; 
function fc_link(ref) {
	sessionStorage.setItem('vCons', 0);
	location.href = ref;
}





function fc_link_consulta(ref) {	
	sessionStorage.setItem('vCons', 1);	
	location.href = ref;
}


function fc_retorna(idev,vref){
	sessionStorage.setItem('vId', idev);            	
	fc_link(vref);
}      



function fc_link_back() {
	history.back();
}

function errorCB(err) {
	ShowHideLoad('false');
	alert('Erro de processamento SQL: ' + err.code);
}

function successCB() {
	console.log('executado com sucesso!');
	// 1 db.transaction(queryDB, errorCB);
}




function validaData(ss, vid){
        var s = tiraBarra(ss);
	    var d = new Date();
	    var dia = d.getDate();
	    var mes = d.getMonth() + 1; //Months are zero based
	    var ano = d.getFullYear();
	    var day, A= s.split(/\D+/).map(function(itm){
	     
             return parseInt(itm, 10)
        });
        day= new Date(A[2], A[1]-1, A[0]);
        
        var novo_s = ss;
     
    if (s.length == 8 && isNaN(A[1])){    	
    	  novo_s = preencheZeros(s.substr(0,2),2) + '/' + preencheZeros(s.substr(2,2),2) + '/'+ preencheZeros(s.substr(4,4),4) ; 
     } else {	 
     
      if (s.length == 6 && isNaN(A[1])){    	
    	  novo_s = preencheZeros(s.substr(0,2),2) + '/' + preencheZeros(s.substr(2,2),2) + '/20'+ preencheZeros(s.substr(4,2),2) ; 
      } else {	 
          if (s.length == 2 && isNaN(A[1]) && eval(s)<=31 ){
        	  novo_s = preencheZeros(s,2) + '/' + preencheZeros(mes.toString(),2) + '/'+ano;
          }else {
        	  if (s.length == 4 && isNaN(A[1])){
        		  novo_s = preencheZeros(s.substr(0,2),2) + '/' + preencheZeros(s.substr(2,2),2) + '/'+ano;       
        	   }else {
        		  if ((s.length == 5) && (isNaN(A[1])==false) && (isNaN(A[2]))){ 
        			 novo_s = preencheZeros(A[0].toString(),2) + '/' + preencheZeros(A[1].toString(),2) + '/'+ano;  
        			 
            	 } //igual 5		
        	 } //else igual a 4
         } //else da data=2
     } //se 6
     } //se 8 
     if (s=='i'){
    	novo_s = preencheZeros(dia.toString(),2) + '/' + preencheZeros(mes.toString(),2) + '/'+ano;    	
     // }  else {
    //	  
    //	  if (validaDataFormatado(novo_s)){
    //		  alert('Data Inválida');
   	//	  novo_s = preencheZeros(dia.toString(),2) + '/' + preencheZeros(mes.toString(),2) + '/'+ano;
    	 
    //  } 
     }
     console.log('valida_data' + vid);
     $(vid).val(novo_s);   	

}

function validaDataFormatado(s){
	
       var day, A= s.split(/\D+/).map(function(itm){
    	
             return parseInt(itm, 10)
        });
        day= new Date(A[2], A[1]-1, A[0]);
   		if(day.getMonth()+1== A[1] && day.getDate()== A[0]) {
   			
        	   return false;
        	
           }  else {        		
        	   return true;
           }	   

}


function gData(s){
	
    var day, A= s.split(/\D+/).map(function(itm){
 	
          return parseInt(itm, 10)
     });
       return  preencheZeros(A[2],4) + '/' + preencheZeros(A[1],2) + '/'+ preencheZeros(A[0],2);
}

function preencheZeros(par,tam)  {  
	
    var cont = par.length;  
    if (par.length != tam)  
    {  
        do  
        {  
            par = "0" + par;  
            cont += 1;  
              
        }while (cont <tam)  
    }  
    return par;
}  



function validaHorMin(s,vid){
	
   
	    var d = new Date();
	    var hora = d.getHours();
	    var minu = d.getMinutes() ;
	    var A= s.split(':').map(function(itm){
	    	
            return parseInt(itm, 10)
       });
	    
	    var retorno=s;
   if (s.length == 4 && isNaN(A[1])){
	  
	    retorno = preencheZeros(s.substr(0,2),2) + ':' + preencheZeros(s.substr(2,2),2) ;

   } else {
	   if (isNaN(A[0]) && (!isNaN(A[1]))) {		   
		   retorno='00:' + preencheZeros(A[1].toString(),2); 
	   }
	   if ((!isNaN(A[0])) && isNaN(A[1])) {
		   
		   retorno= preencheZeros(A[0].toString(),2) + ':00';
	   }else{   
	     if ((eval(A[0])>24) || (eval(A[1])>60) || (s.substr(0,1)=='_' && s.substr(3,1)=='_') ) {
		    retorno= preencheZeros(hora.toString(),2)+':' + preencheZeros(minu.toString(),2);
		   
	    }
	   }
   } //se 4 
   if (s=='i'){
   	  retorno = preencheZeros(hora.toString(),2)+':' + preencheZeros(minu.toString(),2);
  // }  else {
//	   if (validaHorMinFormatado(retorno)){
//		   alert('Hora Inválida');
 //        retorno= preencheZeros(hora.toString(),2)+':' + preencheZeros(minu.toString(),2);
//	   }	   
  	 
   }
   console.log('valida_hora' + vid);
   
   $(vid).val(retorno);
        
}


function validaHorMinFormatado(s){
	
	   
    var A= s.split(':').map(function(itm){
    	
        return parseInt(itm, 10)
   });
    
   if ((eval(A[0])>24) || (eval(A[1])>=60) ) {	
	   return true;
   } else {
	   return false;   
   }
   
    
}


function pegaHorMin(){
	var d = new Date();
    var hora = d.getHours();
    var minu = d.getMinutes() ;
    
    return preencheZeros(hora.toString(),2)+':' + preencheZeros(minu.toString(),2);
	       
}

function pegaHorMinSeg(){
	var d = new Date();
    var hora = d.getHours();
    var minu = d.getMinutes() ;
    var segu = d.getSeconds() ;
    
    return preencheZeros(hora.toString(),2)+':' + preencheZeros(minu.toString(),2)+':' + preencheZeros(segu.toString(),2);
 	       
}



function tiraBarra(s){
	// Replace "the" with "a".
	var re = /[\./-]/g;
	var result = s.replace(re, "");
    return result;
	
}


//var pathWS = "http://192.168.100.245:8080/PeladaFcWS/resource/";
//var pathWS = "http://iatecamprojeto.no-ip.org:2424/PeladaFcWS/resource/";
var pathWS = localStorage.getItem('PathServidorWS');
if (pathWS == null || pathWS == 'null') {
    localStorage.setItem('PathServidorWS', "http://iatecamprojeto.no-ip.org:2424/PeladaFcWS/resource/"); 
    pathWS = localStorage.getItem('PathServidorWS');
  
 }  


function alterarIpServidor(){
	var choice = prompt('Digite o novo endereço do servidor',pathWS);
	
	if(choice != null && choice != 'null'){
		localStorage.setItem('PathServidorWS', choice);
		pathWS = localStorage.getItem('PathServidorWS');
	}
}
//http://iatecamprojeto.no-ip.org:8080/PeladaFcWS/resource/helloworld/%7B%221%22,%225%22%7D
function comunicaWS(vfunctionname, vjson, vtype, callbackDone, callbackFail) {
    var vUrl = pathWS + vfunctionname;
  //  filtraId_Jogo='';
    alert(vUrl);
   //alert( JSON.stringify(vjson));
    console.log('comunica' + JSON.stringify(vjson));
    $.ajax({
        type: vtype,
        url: vUrl,
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(vjson),
        processData: true,
        success: callbackDone,
        error: callbackFail
        
       // xhrFields: {withCredentials: true},
    //	async: true,
	 //   cache: false,
	  //  crossDomain: true,
         
        
       
      
     
        
        
    });
    
   
}

function acesso_carga(fsql) {
	
	 var callbackDone = function(data) {
		// fc_trans_enviado();
		 if (MostraMensagemCarga==1){
			 alert('Concluído Com Sucesso');
		 } else{
			 console.log('Concluído Com Sucesso');
		 }
		 ShowHideLoad('false');
		 fc_origem_pagina() 
	 };
	
	 var callbackFail = function(data) {
	     console.log('Erro de envio '+fsql);
	     if (MostraMensagemCarga==1){
			 alert('Falha de Operacao');
		 }else{
			 console.log('Falha de Operacao');
		 }
	     ShowHideLoad('false');
	     fc_origem_pagina() 
	 };
	
	 fsql = fsql.replace(/(\n|\n)/gm,"!bn!");
	 fsql = fsql.replace(/(\r|\r)/gm,"!br!");
	 fsql = replaceAll(fsql,'undefined','0');
	 fsql = replaceAll(fsql,'/','!b!');
	
	 
	 var json = {"sql": fsql};
	 comunicaWS("fc_carga", json, "POST", callbackDone, callbackFail);
	 
}


function fc_origem_pagina() {
	if (OrigemPagina!=''){
		
		fc_link(OrigemPagina);
	}
}

function fc_carga_servidor() {
	vsql='';
	//se fazSomenteQueChamar=0 manda todas as tabelas se igual a 1 somente a tabela chamada 2-SOMENTE CADASTRO  3-somente jogos
	fazSomenteQueChamar=0;
	OrigemPagina='';
	
	ShowHideLoad('true');
	fc_trans_posicao();
	
  
}
function fc_trans_enviado() {
	//nao usado no momento 02/06/2014
    db.transaction(fc_updade_enviado, errorCB);
}

function fc_updade_enviado(tx){
	
	
	if (vtbl_posicao==1){
	   tx.executeSql('update tbl_posicao set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_local==1){
   	    tx.executeSql('update tbl_local set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_juiz==1){
	   tx.executeSql('update tbl_juiz set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_time==1){
		
	   tx.executeSql('update tbl_time set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_jogador==1){
	    tx.executeSql('update tbl_jogador set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_jogador_time==1){
	    tx.executeSql('update tbl_jogador_time set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_evento==1){
	    tx.executeSql('update tbl_evento set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_jogos==1){
	    tx.executeSql('update tbl_jogos set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_jogos_acao==1){
	    tx.executeSql('update tbl_jogos_acao set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	if (vtbl_jogos_vermelho==1){
	    tx.executeSql('update tbl_jogos_vermelho set enviado=1 where (enviado<>1 or enviado is null) ');
	}
	
}

function fc_envia_cadastro() {	
	ShowHideLoad('true');
    db.transaction(faz_envia_cadastro, errorCB);	
}

function faz_envia_cadastro(tx){
	vsql='';
		//se fazSomenteQueChamar=0 manda todas as tabelas se igual a 1 somente a tabela chamada 2-SOMENTE CADASTRO 3-somente jogos
	fazSomenteQueChamar=2;
	
	OrigemPagina='';
	fc_trans_posicao();	    
}


function fc_envia_movimento() {	
	ShowHideLoad('true');
	filtraId_Jogo='';
    db.transaction(faz_envia_movimento, errorCB);	
    
}

function fc_envia_movimento_id(idjogo) {	
	
	filtraId_Jogo=' where id_jogo= ' + idjogo;
    db.transaction(faz_envia_movimento, errorCB);
  //  alert(filtraId_Jogo);
    
}

function faz_envia_movimento(tx){	
	//se fazSomenteQueChamar=0 manda todas as tabelas se igual a 1 somente a tabela chamada 2-SOMENTE CADASTRO 3-somente jogos
	vsql='';
	fazSomenteQueChamar=3;

	fc_trans_jogos();	    
}


function fc_trans_posicao() {
    db.transaction(fc_carga_posicao, errorCB);
}

function fc_carga_posicao(tx){
	//fazSomenteQueChamar=1;
	tx.executeSql('select * from tbl_posicao     where   grutel = '+vgrutel, [], sucessEnviaPosicao, errorCB);	
}

function sucessEnviaPosicao(tx, results) {  
	
	vsql += 'delete from tbl_posicao' ;
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
        vsql += 'insert into tbl_posicao(codpos, despos,codeve,grutel) values (' ;
        vsql += results.rows.item(i).codpos + "," ;
        vsql += "'" + results.rows.item(i).despos + "'," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        
        vtbl_posicao=1;    
    }
    
    
   
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_local();
    } else {
    	
    	acesso_carga(vsql);
    	
        vsql='';
    }
    
     
}

function fc_trans_local() {
    db.transaction(fc_carga_local, errorCB);
}

function fc_carga_local(tx){
	tx.executeSql('select * from tbl_local   where  grutel = '+vgrutel, [], sucessEnviaLocal, errorCB);
}
function sucessEnviaLocal(tx, results) {
	
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from tbl_local' ;
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
        vsql += 'insert into tbl_local(codloc, desloc,codeve,grutel) values (' ;
        vsql += results.rows.item(i).codloc + ',' ;
        vsql += "'" + results.rows.item(i).desloc + "'," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_local=1;    
    }
    
      
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_juiz();
    } else {
    	acesso_carga(vsql);
    	
        vsql='';
    }
   
    
}
function fc_trans_juiz() {
	
    db.transaction(fc_carga_juiz, errorCB);
}
function fc_carga_juiz(tx){
	//alert('select * from tbl_juiz   grutel = '+vgrutel);
	tx.executeSql('select * from tbl_juiz  where  grutel = '+vgrutel, [], sucessEnviajuiz, errorCB);
}


function sucessEnviajuiz(tx, results) {
//	alert('juiz');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from  tbl_juiz' ;
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
        vsql += 'insert into  tbl_juiz(codjuiz, desjuiz,codeve,grutel) values (' ;
        vsql += results.rows.item(i).codjuiz + "," ;
        vsql += "'" + results.rows.item(i).desjuiz + "'," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_juiz=1;
        
    }
  
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_time();
    } else {
    	acesso_carga(vsql);
    
        vsql='';
    }
    
    
}


function fc_trans_time() {
    db.transaction(fc_carga_time, errorCB);
}
function fc_carga_time(tx){
	tx.executeSql('select * from tbl_time   where   grutel = '+vgrutel, [], sucessEnviaTime, errorCB);
}

function sucessEnviaTime(tx, results) {
//	alert('time');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from  tbl_time' ;
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }    	
        vsql += 'insert into tbl_time(codtim, destim,sigla,codeve,grutel) values (' ;
        vsql += results.rows.item(i).codtim + "," ;
        vsql += "'" + results.rows.item(i).destim + "'," ;
        vsql += "'" + results.rows.item(i).sigla + "'," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_time=1;
        
    }
  
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_jogador();
    } else {
    	acesso_carga(vsql);
    	
        vsql='';
    }
    
}


function fc_trans_jogador() {
    db.transaction(fc_carga_jogador, errorCB);
}
function fc_carga_jogador(tx){
	tx.executeSql('select * from tbl_jogador     where   grutel = '+vgrutel+ '  ', [], sucessEnviaJogador, errorCB);
}

function sucessEnviaJogador(tx, results) {
	//alert('jogador');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from  tbl_jogador' ;
    
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        } 
        vsql += 'insert into tbl_jogador(codjog, desjog,apelido,codpos,codtim,dnasc, RG,telefone,nro,codeve,grutel) values (' ;
        vsql += results.rows.item(i).codjog + "," ;
        vsql += "'" + results.rows.item(i).desjog + "'," ;
        vsql += "'" + results.rows.item(i).apelido + "'," ;
        vsql += results.rows.item(i).codpos + "," ;
        vsql += results.rows.item(i).codtim + "," ;
        vsql += "to_date('" + replaceAll(results.rows.item(i).dnasc,'/','') + "','ddmmyyyy')," ;
        vsql += "'" + results.rows.item(i).RG + "'," ;
        vsql += "'" + results.rows.item(i).telefone + "'," ;
        vsql += results.rows.item(i).nro + "," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_jogador=1;
    }
   
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_jogador_time();
    } else {
    	acesso_carga(vsql);
    	
    	vsql='';
        
    }
   
    
}   



//*************//


function fc_trans_jogador_time() {
    db.transaction(fc_carga_jogador_time, errorCB);
}
function fc_carga_jogador_time(tx){
	tx.executeSql('select * from tbl_jogador_time     where   grutel = '+vgrutel+ '  ', [], sucessEnviaJogadorTime, errorCB);
}

function sucessEnviaJogadorTime(tx, results) {
//	alert('jogador');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from  tbl_jogador_time' ;
    
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        } 
        vsql += 'insert into tbl_jogador_time(codjog, codtim, codeve,grutel) values (' ;
        vsql += results.rows.item(i).codjog + "," ;
        vsql += results.rows.item(i).codtim + "," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_jogador_time=1;
    }
    
   
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==2) {    	
    	fc_trans_evento();
    } else {
    	acesso_carga(vsql);
    	
    	vsql='';
        
    }
   
    
}   


//******************
function fc_trans_evento() {
    db.transaction(fc_carga_evento, errorCB);
}

function fc_carga_evento(tx){
	 tx.executeSql('select * from tbl_evento      where   grutel = '+vgrutel, [], sucessEnviaEvento, errorCB);
}

function sucessEnviaEvento(tx, results) {
	//alert('evento');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from tbl_evento' ;
    
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
    	
        vsql += 'insert into  tbl_evento(codeve, deseve,dcad,hora_inicial,hora_final,primeiro_tempo_min,interval_min,segundo_tempo_min,';
        vsql += 'pontos_vitoria,pontos_empate,tempo_cartao_azul,comentario_tela_inicio,comentario_tela_final,grutel) values ('; 
        vsql += results.rows.item(i).codeve + "," ;
        vsql += "'" +  results.rows.item(i).deseve + "'," ;
        vsql += "to_date('" + replaceAll(results.rows.item(i).dcad,'/','') + "','ddmmyyyy')," ;
        vsql += "'" + results.rows.item(i).hora_inicial + "'," ;
        vsql += "'" + results.rows.item(i).hora_final  + "'," ;
        vsql += results.rows.item(i).primeiro_tempo_min + "," ;
        vsql += results.rows.item(i).interval_min + "," ;
        vsql += results.rows.item(i).segundo_tempo_min + "," ;
        vsql += results.rows.item(i).pontos_vitoria + "," ;
        vsql += results.rows.item(i).pontos_empate + "," ;
        vsql += results.rows.item(i).tempo_cartao_azul + "," ;        
        vsql += "'" + results.rows.item(i).comentario_tela_inicio + "'," ;        
        vsql += "'" + results.rows.item(i).comentario_tela_final + "'," ;        
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_evento=1;
    }
    
   
    if (fazSomenteQueChamar==0) {    	
    	fc_trans_jogos();
    } else {
    	acesso_carga(vsql);
    	
        vsql='';
    }
    
    
}

function fc_trans_jogos() {
    db.transaction(fc_carga_jogos, errorCB);
}

function fc_carga_jogos(tx){
	 var sql='select *,';
	 sql += "case when hora_inicial_real is null then '' else hora_inicial_real end as hora_inicial_real2,";
	 sql += "case when hora_final is null then '' else hora_final end as hora_final2 ";
	 sql += ' from tbl_jogos   where  grutel = '+vgrutel+ replaceAll(filtraId_Jogo,'where','and')+' order by id_jogo  ';

	
	 tx.executeSql(sql, [], sucessEnviaJogos, errorCB);
}
function sucessEnviaJogos(tx, results) {
//	alert('jogos');
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	vsql += 'delete from tbl_jogos ' +  filtraId_Jogo;
    
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
    	
        vsql += 'insert into tbl_jogos(id_jogo, codtim1,codtim2,date,hora_inicial,hora_inicial_real,hora_final,primeiro_tempo,';
        vsql += 'primeiro_tempo_real,primeiro_encerrado,intervalo,intervalo_real,intervalo_encerrado,';
        vsql += 'segundo_tempo,segundo_tempo_real,segundo_encerrado,codjuiz,codloc,encerrado,gol1,gol2,ponto1,ponto2,codeve,grutel) values (';
        vsql += results.rows.item(i).id_jogo + "," ;
        vsql += results.rows.item(i).codtim1 + "," ;
        vsql += results.rows.item(i).codtim2 + "," ;        
        vsql += "to_date('" + replaceAll(results.rows.item(i).date,'/','') + "','ddmmyyyy')," ;
        vsql += "'" + results.rows.item(i).hora_inicial + "'," ;
        vsql += "'" + results.rows.item(i).hora_inicial_real2 + "'," ;
        vsql += "'" + results.rows.item(i).hora_final2 + "'," ;
        vsql += "'" + results.rows.item(i).primeiro_tempo + "'," ;
        vsql += "'" + results.rows.item(i).primeiro_tempo_real + "'," ;
        vsql += results.rows.item(i).primeiro_encerrado + "," ;
        vsql += "'" + results.rows.item(i).intervalo + "'," ;  
        vsql += "'" + results.rows.item(i).intervalo_real + "'," ;  
        vsql += results.rows.item(i).intervalo_encerrado + "," ;  
        vsql += "'" + results.rows.item(i).segundo_tempo + "'," ;  
        vsql += "'" + results.rows.item(i).segundo_tempo_real + "'," ;  
        vsql += results.rows.item(i).segundo_encerrado + "," ;  
        vsql += results.rows.item(i).codjuiz + "," ;  
        vsql += results.rows.item(i).codloc + "," ;  
        vsql += results.rows.item(i).encerrado + "," ;  
        vsql += results.rows.item(i).gol1 + "," ;  
        vsql += results.rows.item(i).gol2 + "," ;  
        vsql += results.rows.item(i).ponto1 + "," ;  
        vsql += results.rows.item(i).ponto2 + "," ;  
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_jogos=1;
        
    }
    if (fazSomenteQueChamar==0 || fazSomenteQueChamar==3) {    	
    	fc_trans_jogos_acao();
    } else {
    	;
    	acesso_carga(vsql);
        vsql='';
    }
    
  }


function fc_trans_jogos_acao() {
    db.transaction(fc_carga_jogos_acao, errorCB);
}


function fc_carga_jogos_acao(tx){
	 
	tx.executeSql('select * from tbl_jogos_acao  where grutel = '+vgrutel+ replaceAll(filtraId_Jogo,'where','and'), [], sucessEnviaJogosAcao, errorCB);
	
}
function sucessEnviaJogosAcao(tx, results) {
//	alert('acao');
	 if (vsql!='') {
       	vsql +=  '!' ;
       }
 	  vsql += 'delete from tbl_jogos_acao'+  filtraId_Jogo;
 		  //where id_jogo=' +results.rows.item(i).id_jogo;
 	  //vsql += ' and codtim=' +results.rows.item(i).codtim ;
 	  //vsql += ' and codjog=' +results.rows.item(i).codjog ;
 	  //vsql += ' and codcao=' +results.rows.item(i).codcao ;
 	 // vsql += " and hora_acao='" +results.rows.item(i).codcao + "'!" ;
      for (var i = 0; i < results.rows.length; i++) {
    	  if (vsql!='') {
          	vsql +=  '!' ;
          }
    	  vsql += 'insert into tbl_jogos_acao(id_jogo, codtim,codjog,codcao,hora_acao,hora_retorno,azul_retorno,periodo_jogo,';
          vsql += 'id_jogo_cumprido,codeve,grutel) values (';
          vsql += results.rows.item(i).id_jogo + "," ;
          vsql += results.rows.item(i).codtim + "," ;
          vsql += results.rows.item(i).codjog + "," ;
          vsql += results.rows.item(i).codcao + "," ;
          vsql += "'" + results.rows.item(i).hora_acao + "'," ;
          vsql += "'" + results.rows.item(i).hora_retorno + "'," ;        
          vsql += results.rows.item(i).azul_retorno + "," ;
          vsql += results.rows.item(i).periodo_jogo + "," ;
          vsql += results.rows.item(i).id_jogo_cumprido + "," ;
          vsql += results.rows.item(i).codeve + "," ;
          vsql += results.rows.item(i).grutel + ')' ;
          
          vtbl_jogos_acao=1;
      }
      
      if (fazSomenteQueChamar==0 || fazSomenteQueChamar==3 ) {    	
    	  fc_trans_jogos_vermelho();
      } else {
    	  acesso_carga(vsql);
          vsql='';
      }
      
}

function fc_trans_jogos_vermelho() {
    db.transaction(fc_carga_jogos_vermelho, errorCB);
}


function fc_carga_jogos_vermelho(tx){	 
	
	//alert(filtraVermelho);
	tx.executeSql('select * from tbl_jogos_vermelho  where  grutel = '+vgrutel+replaceAll(filtraId_Jogo,'where',' and')+replaceAll(filtraVermelho,'where',' or '), [], sucessEnviaJogosVermelho, errorCB);	
}
function sucessEnviaJogosVermelho(tx, results) {
  
	if (vsql!='') {
    	vsql +=  '!' ;
    }
	if (filtraId_Jogo!=''){
		filtraVermelho= replaceAll(filtraVermelho,'where',' or ');
	}
	vsql += 'delete from tbl_jogos_vermelho ' +  filtraId_Jogo +  filtraVermelho;
//	alert(filtraId_Jogo);
	//alert('select * from tbl_jogos_vermelho  where  grutel = '+vgrutel+replaceAll(filtraId_Jogo,'where','and'));
	//where id_jogo=' +results.rows.item(i).id_jogo;  	    
	 //   vsql += ' and codjog=' +results.rows.item(i).codjog +'!' ;
    
    for (var i = 0; i < results.rows.length; i++) {
    	if (vsql!='') {
        	vsql +=  '!' ;
        }
    	vsql += 'insert into tbl_jogos_vermelho(codjog, id_jogo,aberto,codeve,grutel) values (';
        vsql += results.rows.item(i).codjog + "," ;
        vsql += results.rows.item(i).id_jogo + "," ;
        vsql += results.rows.item(i).aberto + "," ;
        vsql += results.rows.item(i).codeve + "," ;
        vsql += results.rows.item(i).grutel + ')' ;
        vtbl_jogos_vermelho=1;
       
    }
    
    acesso_carga(vsql);
 } 


function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}

/**
 * 
 * MOSTRAR ESCONDER LOADING 
 */
function ShowHideLoad(mostrar){
	//alert(mostrar);
	//alert(textoLoad);
	if(mostrar === 'true'){
		
	
	$('#cssLoad').load('animation/load.html');
	var w = $( window ).width();
	var h = $( window ).height();
	
	//alert('H: ' + h);
	
	$('#cssLoad').css({
		'width': w,
		'height': h,
		'position': 'fixed',
		'top': '0',
		'background': '#000',
		'overflow': 'hidden',
		'opacity':'.88',
		'display': 'block',
		'color':'#fff',
		'z-index':'999999999999999',
		'display':'inline'
	});
	
	
	}else{
		$('#cssLoad').css("display","none");
	}
}

// Chamada ShowHideLoad('true');


/**
 * 
 * MOSTRAR ESCONDER CONFIG 
 */
function ShowHideConfig(ident){
	//alert(mostrar);
	//alert(textoLoad);
	if(!$(ident).is(':visible')){
		
	var w = $( window ).width();
	var h = $( window ).height();
	
	//alert('H: ' + h);
	//$('#slc-ev').css('visibility','hidden');
	$(ident).css({
		'width': w,
		'height': h,
		'position': 'fixed',
		'top': '59px',
		'background': '#000',
		'overflow': 'hidden',
		'opacity':'.99',
		'display': 'block',
		'color':'#fff',
		'z-index':'999999999999999',
		'display':'inline'
	});
	}else{
		$(ident).css("display","none");
		//$('#slc-ev').css('visibility','visible');
	}
}

// Chamada ShowHideLoad('true');

