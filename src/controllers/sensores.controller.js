import { pool } from "../db.js";

// Función de getSensores
export const getSensores = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM sensors WHERE `deleted_at` IS NULL");
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de crearSensor
export const crearSensor = async (req,res) => {
    try {
        const {building, door, link_url}= req.body; // los otros datos se obtienen del body
        // const building = req.body.building;
        // const door= req.body.door;
        // const link_url= req.body.link_url;

        const [resultado] = await pool.query("INSERT INTO `sensors` (`building`, `door`, `link_url`) VALUES (?,?,?)", [building, door, link_url]);
       
        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de editarSensor
export const editarSensor = async (req,res) => {
    try {
        const itemId = parseInt(req.params.id); //el id se obtiene por param
        const building= req.body.building; // los otros datos se obtienen del body
        const door= req.body.door;
        const link_url= req.body.link_url;

        // if(itemId=="new"){
        //     const [resultado] = await pool.query("INSERT INTO `sensors` (`building`, `door`, `link_url`) VALUES (?,?,?)", [building, door, link_url]);
        // }else{
        //     const [resultado] = await pool.query("UPDATE `sensors` SET `building`=? , `door`=? , `link_url`=? WHERE `id`=?", [building, door, link_url, itemId]);
        // }
        const [resultado] = await pool.query("UPDATE `sensors` SET `building`=?, `door`=?, `link_url`=? WHERE `id`=?", [building, door, link_url, itemId]);

        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de eliminarSensor
export const eliminarSensor = async (req,res) => {
    try {
        const itemId = parseInt(req.params.id); //en este caso params por que estas accediendo al parametro y no al body
        // aunque sea delete, realmente lo edito
        const [resultado] = await pool.query("UPDATE `sensors` SET `deleted_at` = NOW() WHERE `id` = ?", [itemId]);
        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}