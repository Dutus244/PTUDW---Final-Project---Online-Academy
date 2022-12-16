import db from '../utils/db.js';

export default {
    findAll() {
        return db('categories')
    },

    async findByName(name) {
        const list = await db
            .select('courses.catid', 'coursename', 'lecname', 'rating', 'tuition', 'discount')
            .from('courses')
            .join('categories', 'courses.catid', 'categories.catid')
            .join('lecturers', 'courses.lecid', 'lecturers.lecid')
            .where('catname', '=', name)
            
        return list
    },

    async countByCatName(name) {
        const list = await db
            .count({amount: 'courseid'})
            .from('courses')
            .join('categories', 'courses.catid', 'categories.catid')
            .where('catname', '=', name)
            
        return list[0].amount
    },

    async findPageByName(name, offset, limit) {
        const list = await db
            .select('courses.catid', 'coursename', 'lecname', 'rating', 'tuition', 'discount')
            .from('courses')
            .join('categories', 'courses.catid', 'categories.catid')
            .join('lecturers', 'courses.lecid', 'lecturers.lecid')
            .where('catname', '=', name)
            .offset(offset)
            .limit(limit)
            
        return list
    }
}