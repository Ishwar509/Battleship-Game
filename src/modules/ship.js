class Ship {
   constructor(name, length) {
      this.name = name;
      this.length = length;
      this.health = length;
      this.coordinates = [];
      this.orientation = null;
   }

   hit() {
      this.health -= 1;
   }

   isSunk() {
      return this.health === 0;
   }
}

export default Ship;
