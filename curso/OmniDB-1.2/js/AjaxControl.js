/*
Script de controle de requisições AJAX.

Retorno AJAX:

- return_type: 'error': erro;
			   outro valor: não houve erro, trata na função específica de sucesso AJAX.
- log_code:    Código do log gerado pelo banco.
- data:        Estrutura de dados com dados de retorno do webmethod específico.
*/

var v_calls_count = 0;

// Adicionando Loading Modal;
function startLoading()
{
	v_calls_count++;
	$body = $("body");
    $body.addClass("loading");
}

// Removendo Loading Modal caso todas as chamadas de Loading tenham sido encerradas.
function endLoading()
{
	v_calls_count--;
	if (v_calls_count==0) {
		$body = $("body");
	    $body.removeClass("loading");
    }
}


// Chamando AJAX.
// p_url:         Endereço do webmethod.
// p_data:        Conjunto de dados a serem enviados. Formato: JSON.stringify({param1: valor_param1, param2: valor_param2, ...})
// p_returnFunc:  Função de retorno caso AJAX tenha executado com sucesso.
// p_force:       Mesmo que webmethod tenha gerado um erro, força a execução da função de retorno específica.
// p_errorMode:   Modo de visualização de erro ('box','alert').
function execAjax(p_url,p_data,p_successFunc,p_errorFunc,p_notifMode,p_loading) {

	if (p_loading==null || p_loading==true)
		startLoading();

	var v_status_img = document.getElementById("ajax_status");

	if (v_status_img!=null)
		v_status_img.src = "images/status_blue.png";

	$.ajax({
        type: "POST",
        url: p_url,
        data: p_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(p_return) {

        	if (v_status_img!=null)
				v_status_img.src = "images/status_green.png";

        	if (p_loading==null || p_loading==true)
				endLoading();

        	if (p_return.d.v_error) {

        		if (p_return.d.v_error_id==1)
        			showAlert('Session object was destroyed, click <a href="Login.aspx">here</a> to be redirected to login screen or finish what you were doing and reload the page.');
        		else
        			showError(p_return.d.v_data);

       		}
       		else {
		       	if (p_successFunc!=null)
        			p_successFunc(p_return.d);
        	}
        },
        error: function(msg) {

        	if (v_status_img!=null)
				v_status_img.src = "images/status_green.png";

        	if (p_loading==null || p_loading==true)
				endLoading();

        	if (msg.readyState==0)
        		reportOffline();
        }
	});
}

function reportOffline() {
	showAlert('Webserver was shutdown, please restart it and reload the application.');

	var v_status_img = document.getElementById("ajax_status");

	//if (v_status_img!=null)
	//	v_status_img.src = "images/status_red.png";

}