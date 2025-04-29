import * as studentService from '../service/index.service.js';

export const registerStudent = async (req, res) => {
    try {
        const newStudent = await studentService.createStudent(req.body);
        
        return res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            data: newStudent
        });
    } catch (error) {
        const status = error.status || 500;
        
        const response = {
            success: false,
            message: error.message || 'An error occurred during student registration'
        };
        
        // Add additional error data if available
        if (error.requiredFields) {
            response.requiredFields = error.requiredFields;
        }
        
        if (error.suggestion) {
            response.suggestion = error.suggestion;
        }
        
        if (process.env.NODE_ENV === 'development' && status === 500) {
            response.error = error.toString();
        }
        
        return res.status(status).json(response);
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const result = await studentService.getStudents(req.query);
        
        return res.status(200).json({
            success: true,
            message: 'Students retrieved successfully',
            data: result.students,
            pagination: result.pagination
        });
    } catch (error) {
        const status = error.status || 500;
        
        return res.status(status).json({
            success: false,
            message: error.message || 'An error occurred while fetching students',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
};

export const getStudentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await studentService.getStudentsByClassId(classId, req.query);
        
        return res.status(200).json({
            success: true,
            message: `Students in class ${result.classInfo.name} retrieved successfully`,
            data: result.students,
            classInfo: result.classInfo,
            pagination: result.pagination
        });
    } catch (error) {
        const status = error.status || 500;
        
        return res.status(status).json({
            success: false,
            message: error.message || 'An error occurred while fetching students by class',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
};

export const getStudentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const result = await studentService.getStudentsByCourseId(courseId, req.query);
        
        return res.status(200).json({
            success: true,
            message: `Students taking course ${result.courseInfo.name} retrieved successfully`,
            data: result.students,
            courseInfo: result.courseInfo,
            pagination: result.pagination
        });
    } catch (error) {
        const status = error.status || 500;
        
        return res.status(status).json({
            success: false,
            message: error.message || 'An error occurred while fetching students by course',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
};

export const searchStudents = async (req, res) => {
    try {
        const result = await studentService.searchStudents(req.query);
        
        return res.status(200).json({
            success: true,
            message: 'Search completed successfully',
            data: result.students,
            pagination: result.pagination
        });
    } catch (error) {
        const status = error.status || 500;
        
        return res.status(status).json({
            success: false,
            message: error.message || 'An error occurred while searching for students',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
};