const mongoose = require('mongoose');
const vfd = require ('../models/VFD');
const {io} = require('../lib/socket');

//get
const getVFD = async (req, res) => {
    try {
        const VFD = await mongoose.connection.db.collection('vfds').find({}).sort({createdAt: -1}).limit(1).toArray()
        res.status(200).json(VFD)
    } catch (error) {
        console.error("Error fetching VFD :", error);
        res.status(500).json({error: error.message})
    }
}

const getVFDgraph = async (req, res) => {
    try {
        const VFD = await mongoose.connection.db.collection('vfds').find({}).sort({createdAt: -1}).limit(10).toArray()
        res.status(200).json(VFD)
    } catch (error) {
        console.error("Error fetching VFD :", error);
        res.status(500).json({error: error.message})
    }
}

const addVFD = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!vfd.schema.path(key)) {
                vfd.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const VFD = await vfd.create(requestBody)

        io.emit("newData", requestBody.running_frequency)
        io.emit("newData", requestBody.set_frequency)
        io.emit("newData", requestBody.bus_voltage)
        io.emit("newData", requestBody.output_voltage)
        io.emit("newData", requestBody.output_current)

        io.emit("newData", requestBody.output_power)
        io.emit("newData", requestBody.output_torque)
        io.emit("newData", requestBody.x_state)
        io.emit("newData", requestBody.do_state)
        io.emit("newData", requestBody.ai1_voltage_before_correction)

        io.emit("newData", requestBody.ai2_voltage_before_correction)
        io.emit("newData", requestBody.ai3_voltage_before_correction)
        io.emit("newData", requestBody.linear_speed)
        io.emit("newData", requestBody.accumulative_poweron_time)
        io.emit("newData", requestBody.accumulative_running_time)

        io.emit("newData", requestBody.pulse_input_frequency)
        io.emit("newData", requestBody.communication_setting_value)
        io.emit("newData", requestBody.encoder_feedback_speed)
        io.emit("newData", requestBody.main_frequency_x)
        io.emit("newData", requestBody.aux_frequency_y)

        io.emit("newData", requestBody.synchronous_motor_rotor_pos)
        io.emit("newData", requestBody.motor_temperature)
        io.emit("newData", requestBody.target_torque)
        io.emit("newData", requestBody.resolver_position)
        io.emit("newData", requestBody.power_factor_angle)

        io.emit("newData", requestBody.abz_position)
        io.emit("newData", requestBody.target_voltage_upon_vf_separation)
        io.emit("newData", requestBody.output_voltage_upon_vf_separation)
        io.emit("newData", requestBody.x_state_visual_display)
        io.emit("newData", requestBody.do_state_visual_display)

        io.emit("newData", requestBody.x_function_state_visual_display_1)
        io.emit("newData", requestBody.x_function_state_visual_display_2)
        io.emit("newData", requestBody.fault_information)
        io.emit("newData", requestBody.phase_z_counting)
        io.emit("newData", requestBody.current_set_frequency)

        io.emit("newData", requestBody.current_running_frequency)
        io.emit("newData", requestBody.ac_drive_running_state)
        io.emit("newData", requestBody.current_fault_code)
        io.emit("newData", requestBody.sent_value_of_point_communication)
        io.emit("newData", requestBody.received_value_of_point_communication)

        io.emit("newData", requestBody.torque_upper_limit)

        res.status(200).json(VFD)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getVFD,
    getVFDgraph,
    addVFD
}