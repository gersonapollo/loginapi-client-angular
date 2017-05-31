angular.module("loginclient").controller('loginclientCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.app = "Login Client";
	$scope.aut;
	$scope.usuario;
	$scope.erro;
	$scope.mensagem;
	$scope.subform;
	
	//$scope.erro = JSON.stringify({a:1, b:2});

	var baseUrl = 'https://stormy-gorge-50044.herokuapp.com/login';

	$scope.efetuarLogin = function(usuario){
		$scope.subform = 'Dados do Usuário';
		$scope.mensagem = '';
		var auth = btoa(usuario.email+':'+usuario.senha);
		$scope.aut = auth;
		var config = {
		 headers : {'Authorization' : 'Basic '+auth}
		};

		$http.get(baseUrl, config).then(function(response) {
			$scope.usuario = response.data;
		}, function(err) {
			$scope.mensagem = 'StatusHttp:'+err.data.statusHttp+' '+ 'mensagem:'+ err.data.mensagem
			$scope.erro = err;
			console.log(err);
		});
	};

	$scope.perfilUsuario = function(usuario){
		$scope.subform = 'Perfil do Usuário';
		$scope.mensagem = '';
		var config = {
		 headers : {'Token' : usuario.token}
		};

		$http.get(baseUrl + '/' +usuario.id, config).then(function(response) {
			$scope.usuario = response.data;
		}, function(err) {
			$scope.mensagem = 'StatusHttp:'+err.data.statusHttp+' '+ 'mensagem:'+ err.data.mensagem
			$scope.erro = err;
			console.log(err);
		});
	};

	$scope.telefones = []

	$scope.cadastrarTelefone = function(telefone){
		$scope.telefones.push(angular.copy(telefone));
		delete $scope.telefone; 
	};

	$scope.cadastrarUsuario = function(usuario){
		usuario.telefones = $scope.telefones;
		$scope.subform = 'Dados do Usuário Cadastrado';
		$scope.mensagem = '';
		
		$http.post(baseUrl, usuario).then(function(response) {
			$scope.usuario = response.data;
		}, function(err) {
			$scope.mensagem = 'StatusHttp:'+err.data.statusHttp+' '+ 'mensagem:'+ err.data.mensagem
			$scope.erro = err;
			console.log(err);
		});
	};

}]);