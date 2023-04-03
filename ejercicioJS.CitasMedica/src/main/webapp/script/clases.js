/* Definicion de las clases que se van a usar y que se exportan 
   para llevarlas a funciones.js en donde se hacen uso de ellas. 
*/

//Clase generica creada para que hereden usuario y médico por que comparten muchas similitudes, reciclamos codigo y no se repite.
export class Persona{
	
	constructor(id,nombreApellidos,dni,telefono){
		this._id=id;
		this._nombreApellidos=nombreApellidos;
		this._telefono=telefono;
		this._dni=dni;
	}
	get id(){
		return this._id;
	}
	get nombreApellidos(){
		return this._nombreApellidos;
	}
	set nombreApellidos(valor){
		this._nombreApellidos=valor;
	}
	get dni(){
		return this._dni;
	}
	set dni(dni){
		this._dni=dni;
	}
	get telefono(){
		return this._telefono;
	}
	set telefono(telefono){
		this._telefono=telefono;
	}
	
	mostrarDatos(){	
		console.log(`\n----- Datos de la persona -----\n\nNombre: ${this._nombreApellidos}\nDNI: ${this._dni}\nTelefono: ${this._telefono}`);
	}
}

//Clase usuario que hereda de persona y tiene como atributo propio el número de la seguridad social.
export class Usuario extends Persona{
	
	constructor(id,nombreApellidos,numTarjetaSanitaria,dni,telefono){
		super(id,nombreApellidos,dni,telefono);
		this._numTarjetaSanitaria=numTarjetaSanitaria;
	}

	get numTarjetaSanitaria(){
		return this._numTarjetaSanitaria;
	}
	set numTarjetaSanitaria(valor){
		this._numTarjetaSanitaria=valor;
	}
	
	mostrarDatos(){
		console.log(`\n----- Datos del usuario -----\n\nNombre: ${this._nombreApellidos}\nDNI: ${this._dni}\nTelefono: ${this._telefono}\nTarjeta sanitaria: ${this._numTarjetaSanitaria}`);
	}
}

//Clase médico que hereda de persona y tiene como atributo propio el número de colegiado médico y la especialidad médica.
export class Medico extends Persona{
	
	constructor(id,nombreApellidos,dni,telefono,numColegiado,especialidad){
		super(id,nombreApellidos,dni,telefono);
		this._numColegiado=numColegiado;
		this._especialidad=especialidad;
	}
	
	get numColegiado(){
		return this._numColegiado;
	}
	set numColegiado(valor){
		this._numColegiado=valor;
	}
	get especialidad(){
		return this._especialidad;
	}
	set especialidad(valor){
		this._especialidad=valor;
	}
	mostrarDatos(){
		console.log(`\n----- Datos del médico -----\n\nid Médico: ${this._id}\nNombre: ${this._nombreApellidos}\nEspecialidad: ${this._especialidad}\nNúmero colegiado: ${this._numColegiado}`);
	}
}

//Clase que registra los centros médicos que tendran disponibles los pacientes.
export class CentroMedico{
	
	constructor(id,nombre,telefono,direccion){
		this._id=id;
		this._nombre=nombre;
		this._telefono=telefono;
		this._direccion=direccion;
	}
	get id(){
		return this._id;
	}
	get nombre(){
		return this._nombre;
	}
	set nombre(nombre){
		this._nombre=nombre;
	}
	get telefono(){
		return this._telefono;
	}
	set telefono(telefono){
		this._telefono=telefono;
	}
	get direccion(){
		return this._telefono;
	}
	set direccion(direccion){
		this._direccion=direccion;
	}
	mostrarDatos(){
		console.log(`\n----- Datos del centro médico -----\n\nid Centro médico: ${this._id}\nNombre: ${this._nombre}\nTelefono: ${this._telefono}\nDirección: ${this._direccion}`);
	}
}

//Clase para representar una consulta de un centro médico
export class Consulta {
	constructor(id,nombre, numero) {
		this._id=id;
    	this._nombre = nombre;
    	this.numero = numero;  	  	
  	}
  	get id(){
		return this._id;
	}
  	get nombre(){
		return this._nombre;	
	}
	set nombre(valor){
		this._nombre=valor;
	}
}

//Clase que tendrá la info sobre las citas médicas registradas por los pacientes
export class CitaMedica{
	
	constructor(id,nombrePaciente,fecha,centroMedico,consulta,medico){
		this._id=id;
		this._nombrePaciente=nombrePaciente;
		this._fecha=fecha;
		this._centroMedico=centroMedico;
		this._consulta=consulta;
		this._medico=medico;
	}
	
	//Propiedades de solo lectura de la cita médica registrada
	get id(){
		return this._id;
	}
	get nombrePaciente(){
		return this._nombrePaciente;	
	}
	get fecha(){
		return this._fecha;
	}
	set fecha(valor){
		this._fecha=valor;
	}
	get centroMedico(){
		return this._centroMedico;
	}
	set centroMedico(centroMedico){
		this._centroMedico=centroMedico;
	}
	get consulta(){
		return this._consulta;
	}
	get medico(){
		return this._medico;
	}
	set medico(medico){
		this._medico=medico;
	}
	
	mostrarDatos(){
		console.log(`\n----- Datos de la cita médica -----\n\nid cita: ${this._id}\nNombre del paciente: ${this._nombrePaciente}\nFecha y hora: ${this._fecha.getDate()}/${this._fecha.getMonth()+1}/${this._fecha.getFullYear()} ${this._fecha.getHours()}:${this._fecha.getMinutes()}\nCentro médico: ${this._centroMedico}\nConsulta: ${this._consulta.numero}\nMédico: ${this._medico}`);
	}			
}

