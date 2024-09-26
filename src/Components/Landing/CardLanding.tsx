import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Asegúrate de importar los estilos por defecto del calendario.
import { useDispatch, useSelector } from "react-redux";
import { crearTurno } from "../../redux/servicesAction";

interface ICard {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

const CardLanding: React.FC<ICard> = ({ id, nombre, descripcion, precio }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.users);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = localStorage.getItem("token");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const turnoData = {
      servicioId: id,
      fecha: date,
      time: time,
    };

    dispatch<any>(crearTurno(turnoData, token as string));
    setIsFormVisible(false);
  };

  const handleReserve = () => {
    setIsFormVisible(true); // Mostrar el formulario al hacer clic en "Reservar"
  };

  return (
    <div
      id={id}
      className="border-2 border-[#cb0c4f] backdrop-blur-lg bg-white bg-opacity-30 rounded-lg p-8 hover:shadow-2xl transition-transform transform hover:scale-105 shadow-lg"
    >
      <h2
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "Lato, sans-serif", color: "#cb0c4f" }}
      >
        {nombre}
      </h2>
      <p
        className="text-gray-600 mb-6 leading-relaxed"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {descripcion}
      </p>
      <p
        className="text-gray-600 mb-6 leading-relaxed text-xl"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        Precio: ${precio}
      </p>
      {isFormVisible && (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="calendar"
                className="block text-lg font-medium text-gray-700 mb-2"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Selecciona la Fecha:
              </label>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="custom-calendar w-full max-w-md mx-auto"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-lg font-medium text-gray-700 mb-2"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Selecciona la Hora:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                className="form-input w-full p-2 border bg-white text-black border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <button
                type="submit"
                className="bg-[#cb0c4f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="bg-[#cb0c4f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      )}
      {!isFormVisible && (
        <button
          onClick={handleReserve}
          className="bg-[#cb0c4f] text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors font-semibold text-lg shadow-md"
        >
          Reservar
        </button>
      )}
    </div>
  );
};

export default CardLanding;
