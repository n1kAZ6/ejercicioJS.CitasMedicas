import { CitaMedica, Usuario, Medico, CentroMedico, Consulta, Persona } from "./clases.js";

//Declaración de los array necesario para guardar la información
let listaCitas = [];
let listaPacientes = [];
let listaCentrosMedicos = [];
let listaMedicos = [];


//Declaracion de funciones necesarias para el funcionamiento de la aplicación

// Función con el procedimiento que sigue la aplicación con las opciones que tiene el usuario
function main(){
	let opcion;
	do {
		opcion = menu();
	
		switch (opcion) {
			case 1:
				registrarUsuario();
				break;
			case 2:
				registrarCita();
				break;
			case 3:
				listarDatos(listaCentrosMedicos);
				break;
			case 4:
				listarCitas();
				break;
			case 5:
				borrarCita();
				break;
			case 6:
				alert("\n**[INFO] Saliendo de la aplicación.**");
				break;
			default:
				console.log(`\n**[INFO] opcion no reconocida.**`);
				break;
		}
	} while (opcion !== 6);
}

//Función para mostrar las opciones del menú en la consola y devolver la opción introducida
const menu = () => {
	console.log("\n--- MENÚ CITAS MÉDICAS---");
	console.log("1. Registrar usuario");
	console.log("2. Registrar cita médica");
	console.log("3. Listar centros médicos");
	console.log("4. Listar citas médicas");
	console.log("5. Borrar cita médica");
	console.log("6. Salir");

	return parseInt(prompt("Elige una opción:"));
}

//Función necesaria para que el usuario pueda registrarse en el sistema con los datos que introduzca
const registrarUsuario = () => {
	
	const id=generarId(listaPacientes);
	const nombre = prompt("Introduce nombre y apellidos del paciente");
	const numSanitario = Number(prompt("Introduce un número de la tarjeta sanitaria:"));
	
	if(comprobarRegistro(numSanitario))	
		console.log("\n**[INFO] El paciente ya se encuentra registrado.**");
	else{
		const dni = prompt("Introduce el dni:");
		const telefono = Number(prompt("Introduce un número de teléfono:"));
		listaPacientes.push(new Usuario(id, nombre,numSanitario,dni, telefono));
		console.log("\n**[INFO] Usuario registrado correctamente.**");
	}		
}

//Función que registra cada cita medica si ya se encuentra registrado en el sistema pidiendo los datos al usuario y guarda la instancia CitaMedica en el array.
let cont=1; //Para dar número a las consultas
const registrarCita = () => {
	
	console.clear()
	const numSanitario = Number(prompt("Introduce número de la tarjeta sanitaria del paciente: "));
	
	if(comprobarRegistro(numSanitario)){
		const paciente = encontrarPaciente(numSanitario);
		const id = generarId(listaCitas);
		const nombrePaciente= paciente.nombreApellidos;
		const fecha = prompt("Introduce la fecha de la cita (AA-MM-dd hh:mm:ss):");
		
		listarDatos(listaCentrosMedicos);
		const idCentroMedico = Number(prompt("Introduce el id del centro médico:"));

		listarDatos(listaMedicos);
		const idMedico = Number(prompt("Introduce el médico"));

		listaCitas.push(new CitaMedica(id, nombrePaciente, new Date(fecha),listaCentrosMedicos[idCentroMedico-1].nombre,new Consulta(cont,`Consulta ${cont} urgencias`, cont) ,listaMedicos[idMedico-1].nombreApellidos));
		console.log("\n**[INFO] Cita médica registrada correctamente. **");
		cont++;
	}
	else
		console.log("\n**[INFO] No se encuentra registrado en el sistema.**");	
}

//Funcion que muestra por consola solo las citas registradas por nombre del paciente
const listarCitas = () =>{
	console.clear()

	const nombreAlistar = prompt("Introduce nombre y apellidos del paciente:");
	const citasPaciente = listaCitas.filter(cita => cita.nombrePaciente === nombreAlistar); //El método filter devuelve un array con los elementos que cumplen la condición.
	if(citasPaciente.length>0) {
		console.log(`\n----- Citas médicas de ${nombreAlistar} -----\n`);
		for(let i=0; i<citasPaciente.length; i++) {
			citasPaciente[i].mostrarDatos();
			console.log("");
		}
		return citasPaciente;
	}
	else
		console.log("**[INFO] No tiene ninguna cita medica registrada **");	
		
}

//Función necesaria para que el usuario pueda eliminar cita médica (solo suyas si las hubiera) en base al id de la cita 
const borrarCita = () => {

	const citasPaciente = listarCitas(); //La función listarCitas devuelve un array exclusivamente con las citas registrada de ese paciente
	let citaEliminada=false;
	let idEliminarCita;
	
	if(citasPaciente !== undefined){
		idEliminarCita = Number(prompt("Introduce el identificador de la cita médica a borrar:"));
		for (let i = 0; i < citasPaciente.length; i++){
			if (citasPaciente[i].id === idEliminarCita) {
				citaEliminada=true;
				citasPaciente.splice(i, 1); // Elimina un elemento del array de citas exclusicas del paciente en la posición (i) donde se encuentra con ese id
				console.log("\n**[INFO] Cita médica eliminada correctamente.**");
				break;
			} 			
		}	
	}
	if(citaEliminada){
		for(let i=0;i<listaCitas.length;i++)
			if(listaCitas[i].id === idEliminarCita)
				listaCitas.splice(i,1); // Si se eliminó alguna cita actualizamos eliminando tambien la cita del array principal lista citas donde están todas las citas
	}
	else if(citasPaciente!== undefined)
		 console.log(`\n**[INFO] El identificador de la cita ${idEliminarCita} no existe.**`);
	
}

//Método que da servicio a la aplicación y verifica si ya se encuentra registrado el usuario en el sistema con la tarjeta sanitaria.
const comprobarRegistro = (numSanitario)=>{

	for(let i=0;i<listaPacientes.length;i++){
		if(listaPacientes[i].numTarjetaSanitaria === numSanitario )
			return true;		
	}	
	return false;	
}

//Método que da servicio para encontrar al usuario en el array con la tarjeta sanitaria indicada
const encontrarPaciente = (numSanitario) =>{
	for(let i=0;i<listaPacientes.length;i++){
		if(listaPacientes[i].numTarjetaSanitaria === numSanitario )
			return listaPacientes[i];
	}
}

//Método que da servicio para mostrar los datos de la entidad que se necesite
const listarDatos = (listaObjetos) =>{
	console.clear()
	for(let i=0;i<listaObjetos.length;i++){
		listaObjetos[i].mostrarDatos();
	}
}

//Esta funcion es necesaría por que necesitamos un id único cuando registremos alumnos, médicos o citas médicas.
const generarId =(listaObjetos) => {

	let idMaximo = 0;

	if (listaObjetos.length == 0)
		return 1;
	else
	{
		for (let i = 0; i < listaObjetos.length; i++) {
			if (listaObjetos[i].id > idMaximo)
				idMaximo = listaObjetos[i].id;
		}
	}	
	return idMaximo + 1;
}

//Registro de médicos y centros médicos de ejemplo para probar la aplicación
listaCentrosMedicos.push(new CentroMedico(generarId(listaCentrosMedicos),"Hospital Virgen del Rocío", "955234667" , "Av. Alemania nº5"));
listaCentrosMedicos.push(new CentroMedico(generarId(listaCentrosMedicos),"Hospital Quirón Sagrado Corazón", "95412890" , "C/ Bami nº2"));
listaCentrosMedicos.push(new CentroMedico(generarId(listaCentrosMedicos),"Hospital Virgen de Valme", "642115601" , "C/ Bami nº2"));

listaMedicos.push(new Medico(generarId(listaMedicos),"Dr. Carlos Gómez","22654230-W",672129255,283499999,"Cardiología"));
listaMedicos.push(new Medico(generarId(listaMedicos),"Dr. Julio Torres","29342311-N",621185269,381492001,"Medicina General"));
listaMedicos.push(new Medico(generarId(listaMedicos),"Dr. Victor Arjona","92678811-L",722335245,381492001, "Otorrinolaringología"));
listaMedicos.push(new Medico(generarId(listaMedicos),"Dr. Alberto Salazar","22654230-W",672129255,283499999,"Neurología"));
listaMedicos.push(new Medico(generarId(listaMedicos),"Dr. Gustavo Mora","29342311-N",689052691,381492001,"Cirugía general"));
listaMedicos.push(new Medico(generarId(listaMedicos),"Dra. Martina Delgado","92678811-L",613552459,381492001, "Oftalmología"));

main();


