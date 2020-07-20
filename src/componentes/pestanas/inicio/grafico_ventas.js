import React, { Component } from "react";
import { Chart } from "react-charts";

//este codigo es un reverendo asco :c


function obtenerDia(fecha) {
    // se recibe una fecha y se devuelve un dia de la semana
    const dia = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    //console.log({fecha} , dia[fecha.getDay()]);
    return dia[fecha.getDay()];
}

const GraficoVentas = (registro_vende) => {
    // se le pasa registro_vende
    // https://react-charts.js.org/examples/bar

    const registros = registro_vende.registro_vende;

    let datos_grafico_pre = {
        "Lunes": 0,
        "Martes": 0,
        "Miercoles": 0,
        "Jueves": 0,
        "Viernes": 0,
        "Sabado": 0,
        "Domingo": 0,
    };

    const fecha_actual = Date.now();
    
    const un_dia = 24 * 60 * 60 * 1000;
    

    let fecha_6_dias_atras = new Date(fecha_actual - ( un_dia * 6 ) );
    fecha_6_dias_atras.setHours(0,0,0,0);

    for( const i in registros) {
        const registro = registros[i];
        //console.log({ i ,registro});
        
        const fecha_registro = new Date(registro.vende.fecha);

        if(fecha_registro >= fecha_6_dias_atras) {

            let precio_total = 0;

            for(const j in registro.info) {
                const datos_producto = registro.info[j];
                precio_total += parseInt(datos_producto.precio);
            }

            //console.log({precio_total});

            const dia = obtenerDia(fecha_registro);

            datos_grafico_pre[dia] = datos_grafico_pre[dia] + precio_total;

        }
        
    }


    //console.log({datos_grafico_pre});

    const dias = [
        obtenerDia(new Date(fecha_actual - (un_dia * 6))),
        obtenerDia(new Date(fecha_actual - (un_dia * 5))),
        obtenerDia(new Date(fecha_actual - (un_dia * 4))),
        obtenerDia(new Date(fecha_actual - (un_dia * 3))),
        obtenerDia(new Date(fecha_actual - (un_dia * 2))),
        obtenerDia(new Date(fecha_actual - (un_dia))),
        obtenerDia(new Date(fecha_actual)), 
    ];

    //console.log({dias});

    const datos_grafico = React.useMemo(
        () => [
            {
              label: 'Ventas',
              data: [
                /*
                ["Lunes", datos_grafico_pre["Lunes"]],
                ["Martes", datos_grafico_pre["Martes"]],
                ["Miercoles", datos_grafico_pre["Miercoles"]],
                ["Jueves", datos_grafico_pre["Jueves"]],
                ["Viernes", datos_grafico_pre["Viernes"]],
                ["Sabado", datos_grafico_pre["Sabado"]],
                ["Domingo", datos_grafico_pre["Domingo"]],
                */ 
                [dias[0], datos_grafico_pre[dias[0]]],
                [dias[1], datos_grafico_pre[dias[1]]],
                [dias[2], datos_grafico_pre[dias[2]]],
                [dias[3], datos_grafico_pre[dias[3]]],
                [dias[4], datos_grafico_pre[dias[4]]],
                [dias[5], datos_grafico_pre[dias[5]]],
                [dias[6], datos_grafico_pre[dias[6]]],
            ]
            },
            
          ],
        []
    );

    const series = React.useMemo(
        () => ({
          type: 'bar'
        }),
        []
      )

    const ejes = React.useMemo(
        () => [
            { primary: true, type: "ordinal", position: "bottom" },
            { type: "linear", position: "left" },
        ],
        []
    );

    return (
        <div className="grafico-ventas">
            <label className="titulo-grafico">Ventas Ultimos Dias</label>
            <Chart data={datos_grafico} series={series} axes={ejes} />
        </div>
    );
};

export default GraficoVentas;
