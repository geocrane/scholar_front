<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

p {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  margin: 0;
}

table{
    width: 100%;
    text-align: center;
    vertical-align: middle;
}

.disabled {
  pointer-events: none;
}

.center {
  text-align: center;
}

.justify {
  hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  text-align: justify;
}

.info {
  font-size: 25px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

.background {

  background-image: linear-gradient(to bottom right, #1F1A3F, #0B5244);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
}

.box-shadow-3 {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
}

.box-shadow-5 {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
}

.info-field {
  height: 55px;
  margin-bottom: 10px;
}

.no-margin-bott {
  padding-bottom: 0;
}

.right-align {
  text-align: right;
}

.question {
  height: 125px;
  background-color: rgba(255, 255, 255, 0.5);
  background-size: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 1px 1px 5px 1px rgb(122, 122, 122, 0.5);
  border-radius: 5px;
}

.center-field {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  height: 110px;
}

.button {
  background: white;
  height: 40px;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 1px 5px 1px rgb(122, 122, 122, 0.5);
  border-radius: 7px;
  padding-top: 2px;
  padding-bottom: 0px;
  color: #000000;
  font-size: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-align: center;
  margin-bottom: 15px;
}

.instruction {
  padding-top: 30px;
  margin-bottom: 0px;
}

.text-instruction {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0px;
}

.right {
  color: white;
  background-color: #44d368;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

.next-button {
  /* Позиционируем внизу main */
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #52809e;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  font-size: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-align: center;
  padding-top: 5px;
  margin-bottom: 0;
}

.inactive {
  color: rgb(204, 204, 204);
  background: #badce9;
}
</style>