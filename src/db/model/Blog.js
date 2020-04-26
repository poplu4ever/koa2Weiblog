/**
 * @description Weiblog Data Model
 * @author NeoLu
 */

 const seq = require('../seq');
 const { INTEGER, STRING, TEXT } = require('../types.js');

 const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'userid'
    },
    content: {
        type: TEXT,
        allowNull: false,
        commet: 'blog content'
    },
    image: {
        type:STRING,
        comment: 'image url'
    }
 });

 module.exports = Blog;