class Quadtree {
    constructor(boundary, capacity) {
      this.boundary = boundary;
      this.capacity = capacity;
      this.points = [];
      this.divided = false;
    }
  
    insert(point) {
      if (!this.boundary.contains(point)) {
        return false;
      }
  
      if (this.points.length < this.capacity) {
        this.points.push(point);
        return true;
      }
  
      if (!this.divided) {
        this.subdivide();
      }
  
      if (this.northwest.insert(point)) return true;
      if (this.northeast.insert(point)) return true;
      if (this.southwest.insert(point)) return true;
      if (this.southeast.insert(point)) return true;
    }
  
    subdivide() {
      const x = this.boundary.x;
      const y = this.boundary.y;
      const w = this.boundary.w / 2;
      const h = this.boundary.h / 2;
  
      this.northwest = new Quadtree(new Rectangle(this.boundary.x - this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
      this.northeast = new Quadtree(new Rectangle(this.boundary.x + this.boundary.w / 4, this.boundary.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
      this.southwest = new Quadtree(new Rectangle(this.boundary.x - this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
      this.southeast = new Quadtree(new Rectangle(this.boundary.x + this.boundary.w / 4, this.boundary.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
      
  
      this.divided = true;
    }
  
    query(range, found) {
        if (DEBUG) {
            console.log(this.points, range);
          }
        if (!found) {
          found = [];
        }
      
        if (!this.boundary.intersects(range)) {
          return found;
        }
      
        for (const point of this.points) {
          if (range.contains(point)) {
            found.push(point);
          }
        }
      
        if (this.divided) {
          this.northwest.query(range, found);
          this.northeast.query(range, found);
          this.southwest.query(range, found);
          this.southeast.query(range, found);
        }
      
        return found;
      }

      show() {
        stroke(255, 0, 0);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
    
        if (this.divided) {
          this.northwest.show();
          this.northeast.show();
          this.southwest.show();
          this.southeast.show();
        }
      }
      
  }
  
  class Rectangle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  
    contains(point) {
        return (
          point.position.x >= this.x - this.w / 2 &&
          point.position.x <= this.x + this.w / 2 &&
          point.position.y >= this.y - this.h / 2 &&
          point.position.y <= this.y + this.h / 2
        );
      }
  
    intersects(range) {
      return !(
        range.x - range.w / 2 > this.x + this.w / 2 ||
        range.x + range.w / 2 < this.x - this.w / 2 ||
        range.y - range.h / 2 > this.y + this.h / 2 ||
        range.y + range.h / 2 < this.y - this.h / 2
      );
    }
  }
  