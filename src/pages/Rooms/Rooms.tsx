import blankImg from "../../assets/images/feeling-lonely.svg";

const Rooms = () => {
  const rooms = [];

  const blank = (
    <div>
      <img
        className="block w-1/2 mx-auto mb-6"
        src={blankImg}
        alt="A sad woman sitting on the windowsill"
      />
      <h3 className="text-center">
        Here are no rooms yet. Why not create the first one?
      </h3>
    </div>
  );

  if (rooms.length === 0) {
    return <div className="p-8 border-gray-300 border-2 rounded-3xl">{blank}</div>;
  }

  return (
    <>
      <h1>Rooms</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad, accusantium
        vel debitis praesentium quod quisquam provident consequatur sequi necessitatibus
        nisi totam alias dignissimos reprehenderit autem nihil. Nulla, rerum distinctio.
        Eius deleniti repellendus explicabo impedit qui quibusdam quia error molestias
        corporis iusto officia quaerat labore consequatur, aliquam excepturi cupiditate
        eos natus a, modi rem quam saepe dignissimos animi obcaecati. Ut! Aliquid, odit
        corporis! Dolorum rerum sequi velit, nisi recusandae minima id sapiente
        repellendus aut quo corporis numquam veniam repellat natus, dolores, aspernatur
        dignissimos! Beatae, provident explicabo? Obcaecati atque suscipit tempora?
        Reiciendis illum totam veniam vitae at eius nemo illo? Odio blanditiis vel est
        repudiandae magni reiciendis, saepe aspernatur, sint eveniet soluta autem corporis
        odit rem, reprehenderit quam deserunt iste quidem! Voluptate et, fugiat soluta
        culpa sit, nulla vero provident expedita iure, molestias nihil quasi dolorum at
        assumenda ex. Exercitationem vitae cupiditate vel veniam similique voluptatem
        reprehenderit numquam hic illum laboriosam. Perspiciatis rerum voluptatum quia
        saepe sed dolorem ullam distinctio, enim earum fugiat, atque voluptate nisi neque!
        Molestiae cumque ad odit reprehenderit at. Nam, illum voluptas provident animi
        nostrum recusandae quo. Eligendi et iusto temporibus reprehenderit neque fugit
        nobis inventore doloremque natus, aliquid consequuntur error eum voluptate, quasi
        eaque quos sunt ratione architecto non ad facere sit? Quas commodi laudantium
        eveniet. Saepe delectus quo minus cupiditate explicabo natus, ipsa nesciunt esse
        architecto iure est placeat dolorem eaque alias, quidem totam! At officiis sed
        quaerat error soluta odit nesciunt voluptas dignissimos omnis! Ea aspernatur quis
        dignissimos, tenetur laborum autem dolorem! Error quisquam aliquid, tenetur quas
        fuga ullam iure at. Ad modi, harum id, quidem ipsum nulla adipisci labore rerum,
        doloribus laborum at? Perspiciatis doloribus adipisci tempora ut iure! Suscipit
        dolore reiciendis, tenetur laborum sunt sequi quas repellat quaerat dolorum
        praesentium blanditiis nostrum, perferendis explicabo rerum libero debitis
        doloremque, cupiditate dolorem. Corporis, vitae!
      </p>
    </>
  );
};

export default Rooms;
