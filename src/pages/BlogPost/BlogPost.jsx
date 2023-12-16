import  { useState, useEffect } from "react";
import { blogsService } from "../../services";
import BlogLayout from "../../components/BlogLayout/BlogLayout";
import { useParams } from "react-router-dom";
import img from "../../assets/images/imageCardOne.png";
import styles from "./BlogPost.module.css";
import ShareSVG from "../../assets/images/shareSVG";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { Menu, MenuItem } from "@mui/material"; // Import Material-UI components
import { Footer, Header } from "../../components";
import Aos from 'aos'
import 'aos/dist/aos.css'; // Import the AOS CSS
import i18n from 'i18next';

import { useTranslation } from "react-i18next";


const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const { t } = useTranslation()

  const description =
    "Във веган десертите се крие вкусът и красотата на сладостите, без да се налага жертва на животински продукти. Независимо дали сте веган или просто търсите нови и вълнуващи вкусове, веган десертите предлагат безброй възможности за удоволствие. От сладки тартове до пухкави кексчета, веган десертите са създадени с натурални съставки като растителни млека, кокосово масло, плодове и ядки. Те са богати на витамини, минерали и важни хранителни вещества, които са добри за здравето. Независимо дали искате да се насладите на класическия шоколадов десерт или да изпробвате нещо по-екзотично като авокадов пудинг, веган десертите ще ви зарадват с вкусни и здравословни изкушения. Открийте света на веган десертите и се насладете на сладки моменти без усещане за вина. Във веган десертите се крие вкусът и красотата на сладостите, без да се налага жертва на животински продукти. Независимо дали сте веган или просто търсите нови и вълнуващи вкусове, веган десертите предлагат безброй възможности за удоволствие. От сладки тартове до пухкави кексчета, веган десертите са създадени с натурални съставки като растителни млека, кокосово масло, плодове и ядки. Те са богати на витамини, минерали и важни хранителни вещества, които са добри за здравето. Независимо дали искате да се насладите на класическия шоколадов десерт или да изпробвате нещо по-екзотично като авокадов пудинг, веган десертите ще ви зарадват с вкусни и здравословни изкушения. Открийте света на веган десертите и се насладете на сладки моменти без усещане за вина. Във веган десертите се крие вкусът и красотата на сладостите, без да се налага жертва на животински продукти. Независимо дали сте веган или просто търсите нови и вълнуващи вкусове, веган десертите предлагат безброй възможности за удоволствие. От сладки тартове до пухкави кексчета, веган десертите са създадени с натурални съставки като растителни млека, кокосово масло, плодове и ядки. Те са богати на витамини, минерали и важни хранителни вещества, които са добри за здравето. Независимо дали искате да се насладите на класическия шоколадов десерт или да изпробвате нещо по-екзотично като авокадов пудинг, веган десертите ще ви зарадват с вкусни и здравословни изкушения. Открийте света на веган десертите и се насладете на сладки моменти без усещане за вина.";

  const { id } = useParams();

  useEffect(() => {
    fetchBlogData();
    return () => {};
  }, [id]);
  
  useEffect(()=>{
    Aos.init()
  },[])

  const fetchBlogData = async () => {
    try {
      const blogData = await blogsService.getBlogById(id);
      setBlog(blogData);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  // Function to handle the click of the "сподели" button
  const handleShareClick = (event) => {
    setMenuAnchorEl(event.currentTarget); // Set the anchor element to open the menu
  };

  // Function to close the dropdown menu
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
  };

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("bg-BG", options);
  }

  function splitDescription(content) {
    const sentences = content.split(". ");
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += 2) {
      if (i < sentences.length - 1) {
        paragraphs.push(sentences[i] + ". " + sentences[i + 1] + ".");
      } else {
        paragraphs.push(sentences[i] + ".");
      }
    }

    return paragraphs;
  }

  return (<> 
  <Header/>
  <BlogLayout>
      {blog && (
        <>
          <div className={styles.blogPostContainer}>
            <img  data-aos="fade-up"
              src={blog.imagePath === "fake/path" ? img : blog.imagePath}
              alt="Blog post image"
            />
            <div className={styles.blogPostMetaInfo}>
              <span>{formatDate(blog.datePosted)}</span>
                 <h1 data-aos="fade-up">
               {  i18n.language === "en" ? 
               blog.en_title
               :
               blog.bg_title
               }
              </h1>
             
              <div data-aos="fade-up">
            {    i18n.language === "en" ?   splitDescription(blog.en_content).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  :
                  splitDescription(blog.bg_content).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                  }
              </div>
              <div data-aos="fade-up" className={styles.blogPostBottomBar}>
                <p>Автор: {blog.authorName}</p>
                <div onClick={handleShareClick}>
                  <ShareSVG />
                  <p>  {t("blogCards.share")}</p>
                </div>
                <Menu
                  id="share-menu"
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={copyUrlToClipboard}>
                    <LinkOutlinedIcon style={{ marginRight: "10px" }} />
                    {t("blogCards.coppy")}
                  </MenuItem>
                  <div>
                    <TwitterShareButton url={window.location.href}>
                      <MenuItem onClick={handleCloseMenu}>
                        <TwitterIcon style={{ marginRight: "10px" }} />
                        {t("blogCards.share")}{' '}{t("blogCards.in")}  Twitter
                      </MenuItem>
                    </TwitterShareButton>
                  </div>
                  <div>
                    <FacebookShareButton url={window.location.href}>
                      <MenuItem onClick={handleCloseMenu}>
                        <FacebookIcon style={{ marginRight: "10px" }} />
                        {t("blogCards.share")}{' '}{t("blogCards.in")}  Facebook
                      </MenuItem>
                    </FacebookShareButton>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </BlogLayout>
    <Footer/>
  </>
   
  );
};

export default BlogPost;
