import { useState, useEffect } from "react";
import styles from "./BlogPage.module.css";
import { blogsService } from "../../services";
import { Pagination } from "@mui/material";
import img from "../../assets/images/imageCardOne.png";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout/BlogLayout";
import i18n from 'i18next';


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchProductsData();
    return () => {};
  }, []);

  const fetchProductsData = async () => {
    try {
      const blogsData = await blogsService.getAllBlogs();
      // temporary coppy one of the blogs for rendering it and matching design
      if (blogsData.length < 3) {
        // If there are fewer than 3 elements, repeat the last element to fill the array.
        while (blogsData.length < 3) {
          blogsData.push(blogsData[blogsData.length - 1]);
        }
      }
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("bg-BG", options);
  }

  return (
    <BlogLayout>
      <div className={styles.cardsWrapper}>
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog.id}`} key={index}>
            <div className={styles.blogPost}>
              <div className={styles.imgBlogPost}>
                <img className={styles.innerImgBlogPost} src={blog?.imagePath?blog?.imagePath:img} />
              </div>
              <div className={styles.textContent}>
                <div className={styles.metaInfo}>
                  <span>{formatDate(blog.datePosted)}</span>
                  <span>Време за четене: 5 мин.</span>
                  <span>Автор: {blog.authorName}</span>
                </div>
                { i18n.language === "en" ?
                <>
                 <h3>{blog.en_title}</h3>
                  <p>{blog.en_content}</p>
                </>
                 
                  :
                  <>
                  <h3>{blog.bg_title}</h3>
                  <p>{blog.bg_content}</p></>
                  

                }
                {/* <h3>{blog.title}</h3>
                <p>{blog.content}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination count={5} />
    </BlogLayout>
  );
};

export default BlogPage;
