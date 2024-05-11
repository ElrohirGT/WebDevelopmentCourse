# Chessy
[Link al repo](https://github.com/ElrohirGT/Chessy)

Chessy es un juego de ajedrez diseñado para jugar con otra persona sobre la red. Utiliza websockets para comunicarse entre páginas web clientes. El proyecto está todavía en desarrollo con mi amigo Daniel Rayo.

* Listado de stack de tecnología utilizado (backend, frontend, base de datos, etc).
    - Frontend: VueJS.
    - Backend: Rust.
    - DB: No utiliza.

* ¿Porqué utilizó la tecnología elegida para el backend?

Se utilizó Rust principalmente porque este proyecto tenía como objetivo ayudarme a aprender websockets y Rust.

* ¿Porqué utilizó la tecnología elegida para el frontend?

La tecnología que Daniel Rayo quería aprender en ese tiempo era un framework de javascript distinto de React ya que ese lo íbamos a aprender justamente en el curso de web. Así que decidió aprender VueJS.

* ¿Porqué utilizó la tecnología elegida para la base de datos?

El proyecto no guarda datos dentro de una base de datos.

* En retrospectiva, ¿Usaría nuevamente esa tecnología para frontend si iniciara el proyecto nuevamente?

Estuve platicando con Daniel Rayo y definivamente le gustó mucho VueJS. Yo lo probé cuando estaba en el colegio y también me gustó. Por lo que muy probablemente si la volvería a usar para este proyecto.

* En retrospectiva, ¿Usaría nuevamente esa tecnología para backend si iniciara el proyecto nuevamente?

Sí. Encontré que rust es sencillo de utilizar para backends cuando realmente no necesitas más abstracciones que las que da el framework. Si lo volviera a iniciar definitivamente reorganizaría mejor el código.

* En retrospectiva, ¿Usaría nuevamente esa tecnología para base de datos si iniciara el proyecto nuevamente?

El proyecto no utiliza una base de datos.

* De los temas que vimos en clase, ¿Cual aplicaría en el proyecto? y ¿Por qué?

Posiblemente el tema que utilizaría más sería la publicación en AWS. El proyecto nunca se llegó a publicar de forma seria, como le digo todavía es un WIP pero la introducción a AWS que se dió en el curso fue suficiente para darme más confianza a publicar mis propias cosas.

* ¿Cómo pusieron el proyecto en producción? ¿Cómo homologaron entornos de desarrollo?

No se ha publicado todavía, sin embargo el proyecto utiliza Nix para los entornos de desarrollo. Esta tecnología permite definir entornos de desarrollo completamente reproducibles en un solo archivo. Es parecido a como se utiliza el package.json dentro de una aplicación de Node pero en lugar de ser para un proyecto es para entornos de desarrollo. Por lo que al momento de publicar se utilizaría igual Nix para homologar el entorno de publicación con el de desarrollo.

* Durante el desarrollo de su proyecto, ¿ocurrió alguna situación en la que crean que haber realizado tests los hubiera ayudado? Si incluyeron tests en su proyecto, pueden explicar de qué manera les ayudaron.

Que yo recuerde no incluimos tests, la verdad eso hubiera servido muchísimo, en especial para la programación del engine de ajedrez ya que hasta el momento no tenemos otra forma de probar que en realidad se haya programado bien al 100% más que utilizando la interfaz incompleta.

* Durante el desarrollo de su proyecto, ¿ocurrió alguna situación en la que crean que haber un manejador de versiones los hubiera ayudado? Si lo usaron en su proyecto, pueden explicar de qué manera y qué manejador usaron.

Definitivamente utilizamos un manejador de versiones, en este caso git. Sin embargo no utilizamos ninguna filosofía de desarrollo como lo sería gitflow o githubflow. Sino simplemente haciamos commits y push a master. Para proyectos de este estilo más serios que haría con mis amigos definitvamente utilizaría otra estructura, por ejemplo para el proyecto de Ing. Software estamos utilizando GitFlow.

* ¿Qué fué lo más difícil del proyecto?

En mi opinión lo más difícil del proyecto fue desarrollar el engine de ajedrez, el juego tiene algunas reglas raras como lo son el enroque o el _en passant_. Definir estas reglas y probarlas fue difícil, en especial porque todavía no se tiene completa la interfaz gráfica.

* ¿Se cumplieron los objetivos del proyecto?

Todavía es un work in progress por lo que no hemos terminado el proyecto, pero mi objetivo principal de aprender rust y websockets sí lo logré cumplir pues el backend ya funciona y acepta conexiones cuando se corre. Posiblemente tenga un montón de bugs pero no los hemos podido probar en su totalidad por la falta de tests y la interfaz incompleta.

* ¿Qué les gustó más de la tecnología utilizada en el frontend? y ¿Qué le gustó menos?

Yo no estuve desarrollando el frontend, sin embargo cuando utilicé Vue en mi colegio lo que más me gustó fue el que el estilo, comportamiento y vista de mis componentes estuvieran en un solo archivo. Hacía sentir a mis componentes más como componentes. Lo que menos me gustó fue el manejo de los datos, talvez porque en ese tiempo no sabía programar tanto como ahora o porque no utilicé alguna store como lo es Vuex.

* ¿Qué les gustó más de la tecnología utilizada en el backend? y ¿Qué le gustó menos?

Lo que más me gustó de Rust es su sistema de tipado y los errores del compilador, comparado con otros lenguajes son sumamente amigables y la verdad si fui víctima del "Si compila funciona". Lo que menos me gustó fue la falta de documentación avanzada sobre cómo organizar un proyecto utilizando websockets. Si volviera a realizar el proyecto definivamente mejoraría el orden porque aún ahora pienso que ese código aunque funciona y tiene todas las garantías de rust, es spaguetti.

* De una reflexión personal del proyecto.

El proyecto Chessy me gustó a pesar de que no lo terminamos nunca con Rayo y posiblemente nunca lo vayamos a terminar jaja. Aprendí cómo funciona la tecnología de WebSockets y también me sirvió un poco de level up para mi maestría del lenguaje Rust. Además marcó el inicio de una tradición en donde cada vacaciones me pongo de acuerdo con un mi amigo para realizar un proyecto de algo. Este año es con José Prince para desarrollar una copia del frontend de Amazon utilizando ELM!
