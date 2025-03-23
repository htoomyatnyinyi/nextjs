import Image from "next/image";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const About = () => {
  return (
    <div>
      <h1>This is about page</h1>
      {/* <Image src="/vercel.svg" alt="image" fill /> */}
      <Image
        src="/plant.png"
        alt="image"
        style={imageStyle}
        width={400}
        height={400}
        priority
      />
      {/* <Image src="/diary.png" alt="image" width={500} height={500} /> */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex
        deleniti fugit error architecto nisi animi illum ab porro, accusamus
        tenetur quos amet adipisci quis quam repudiandae! At, cum mollitia.
      </p>
    </div>
  );
};

export default About;
