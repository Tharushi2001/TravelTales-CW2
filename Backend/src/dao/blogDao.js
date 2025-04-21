const db=require("../db");

exports.getAllPosts=(callback)=>{
    const sql="SELECT * FROM blog_posts ORDER BY created_at DESC";
    db.query(sql,callback);
};

exports.createPost=(title,content,image,callback)=>{
    const sql="INSERT INTO blog_posts (title,content,image_url) VALUES (?,?,?)";
    db.query(sql,[title,content,image],callback);
};

exports.deletePost = (id, callback) => {
    const sql = "DELETE FROM blog_posts WHERE id = ?";
    db.query(sql, [id], callback);
  };