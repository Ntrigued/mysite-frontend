import {JSXElementConstructor, ReactElement, ReactFragment, useEffect, useState} from "react";
import CSS from 'csstype';

interface BlogPost {
  id: any,
  title: string,
  body: string | undefined
}

async function replaceEmbedsWithMedia(embed_elem: HTMLEmbedElement) {
  if (embed_elem.attributes.getNamedItem('embedType')?.value == 'image') {
    let image_id = embed_elem.attributes.getNamedItem('id')?.value;
    if (image_id) {
      let image_json = await fetch(process.env.NEXT_PUBLIC_BASE_IMAGES_API_URL + image_id).then((data) => data.json());
      embed_elem.height = image_json.height;
      embed_elem.width = image_json.width;
      embed_elem.src = process.env.NEXT_PUBLIC_BASE_URL + image_json.meta.download_url;
    }
  }
}

async function blogHTMLTailwindFix(elem: Element) {
  if (elem.nodeName == 'EMBED') {
    await replaceEmbedsWithMedia(elem as HTMLEmbedElement);
  } else if(elem.nodeName == 'UL') {
    elem.className += ' list-disc';
  } else {
    let proms: Promise<any>[] = []
    // @ts-ignore
    for (let child_elem of elem.children) proms.push(await blogHTMLTailwindFix(child_elem));
    await Promise.allSettled(proms);
  }
}

async function getAllBlogsInfo() {
  const request_url = process.env.NEXT_PUBLIC_BASE_PAGES_API_URL as string;
  let data = await fetch(request_url).then((data) => data.json());
  let proms = [];
  let items = data.items as Array<BlogPost>;
  for (const item of items) {
    proms.push((async () => {
      const request_url = process.env.NEXT_PUBLIC_BASE_PAGES_API_URL as string;
      const resp = await fetch(request_url + item.id).then((data) => data.json());
      item.body = resp.body
    })());
  }
  let x = await Promise.allSettled(proms);
  return data.items;
}

export default function HomePage(props: any) {
  const [blog_posts, setBlogPosts] = useState([]);

  useEffect(() => {
    getAllBlogsInfo().then((data) => setBlogPosts(data));
  }, []);
  useEffect(() => {
    let class_elems = document.getElementsByClassName('div-with-media');
    // @ts-ignore
    for (let elem of class_elems) {
      let _ = blogHTMLTailwindFix(elem);
    }
  }, [blog_posts]);

  let blog_feed: JSX.Element[] = []
  blog_posts.map((blog_post: BlogPost, i) => {
    if ('body' in blog_post) {
      blog_feed.push(
          <div className={'list-disc'}>
            <h2 key={i} className={'text-4xl'}>{blog_post.title}</h2>
            <div dangerouslySetInnerHTML={{__html: blog_post.body as string}} className={'div-with-media'}></div>
          </div>
      );
    }
  });

  return (
      <div className={'inline-flex flex-col xl:ml-[2.5%] xl:mr-[5%] xl:w-[92.5%] '}>
        <h1 className={'text-8xl'}>Home Page</h1>
        <div>{blog_feed}</div>
      </div>
  );
}