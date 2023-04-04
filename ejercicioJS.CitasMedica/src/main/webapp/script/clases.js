/* Definicion de las clases que se van a usar y que se exportan 
   para llevarlas a funciones.js en donde se hacen uso de ellas. 
*/

//Clase generica creada para que hereden usuario y médico por que comparten muchas similitudes, reciclamos codigo y no se repite.
export class Persona{
	
	constructor(id,nombreApellidos,dni,telefono,fechaNacimiento){
		this._id=id;
		this._nombreApellidos=nombreApellidos;
		this._telefono=telefono;
		this._dni=dni;
		this._fechaNacimiento=fechaNacimiento;
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
	get fechaNacimiento(){
		return `${this._fechaNacimiento.getDate()}/${this._fechaNacimiento.getMonth()+1}/${this._fechaNacimiento.getFullYear()}`;
	}
	set fechaNacimiento(fecha){
		this._fechaNacimiento=fecha;
	}
	
	mostrarDatos(){	
		console.log(`\n----- Datos de la persona -----\n\nNombre: ${this._nombreApellidos}\nDNI: ${this._dni}\nTeléfono: ${this._telefono}`);
	}
	
	calcularEdad(){
		const fechaActual = new Date();
		const mesActual= fechaActual.getMonth()+1;
		const diaActual = fechaActual.getDate();
		const anyoActual = fechaActual.getFullYear();
		
		if(mesActual < this._fechaNacimiento.getMonth()+1 || (mesActual === this._fechaNacimiento.getMonth()+1 && diaActual < this._fechaNacimiento.getDate()))
			return anyoActual-this._fechaNacimiento.getFullYear()-1;
		else	
			return anyoActual-this._fechaNacimiento.getFullYear();
	}
}

//Clase usuario que hereda de persona y tiene como atributo propio el número de la seguridad social.
export class Usuario extends Persona{
	
	constructor(id,nombreApellidos,numTarjetaSanitaria,dni,telefono,fechaNacimiento){
		super(id,nombreApellidos,dni,telefono,fechaNacimiento);
		this._numTarjetaSanitaria=numTarjetaSanitaria;
	}

	get numTarjetaSanitaria(){
		return this._numTarjetaSanitaria;
	}
	set numTarjetaSanitaria(valor){
		this._numTarjetaSanitaria=valor;
	}
	
	mostrarDatos(){
		console.log(`\n----- Datos del usuario -----\n\nNombre: ${this._nombreApellidos}\nEdad: ${this.calcularEdad()}\nDNI: ${this._dni}\nTeléfono: ${this._telefono}\nNúmero tarjeta sanitaria: ${this._numTarjetaSanitaria}`);
	}
}

//Clase médico que hereda de persona y tiene como atributo propio el número de colegiado médico y la especialidad médica.
export class Medico extends Persona{
	
	constructor(id,nombreApellidos,dni,telefono,numColegiado,especialidad,fechaNacimiento){
		super(id,nombreApellidos,dni,telefono,fechaNacimiento);
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
	
	constructor(id,nombrePaciente,fecha,centroMedico,consulta,medico,motivoCita){
		this._id=id;
		this._nombrePaciente=nombrePaciente;
		this._fecha=fecha;
		this._centroMedico=centroMedico;
		this._consulta=consulta;
		this._medico=medico;
		this._motivoCita=motivoCita;
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
	get motivoCita(){
		return this._motivoCita;
	}
	set motivoCita(mensaje){
		this._motivoCita=mensaje;
	}
	
	mostrarDatos(){
		const fecha = `${this._fecha.getDate()}/${this._fecha.getMonth()+1}/${this._fecha.getFullYear()}`;
		//Con método padStart() rellenamos la hora y los minutos para que se muestre el formato correcto 00:00 
		const horaConFormato =String(this._fecha.getHours()).padStart(2,"0")+":"+String(this._fecha.getMinutes()).padStart(2,"0");
		
		
		console.log(`\n----- Datos de la cita médica -----\n\nid cita: ${this._id}\nNombre del paciente: ${this._nombrePaciente}`);
		console.log(`\nFecha y hora: ${fecha} ${horaConFormato}\nCentro médico: ${this._centroMedico}`);
		console.log(`\nConsulta número: ${this._consulta.numero}\nMédico: ${this._medico}\nMotivo de la cita: ${this._motivoCita}`);
	}			
}

