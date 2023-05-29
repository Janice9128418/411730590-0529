// class 類別，粒子
class obj{ //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
      this.p = args.p || createVector (random(width),random(height)) //把原本(x:...,y:...)改成向量
      this.v =createVector(random(-1,1,),random(-1,1))//把原本(x:...,y:...)改成向量
      this.size = random(10,15)  //一個物件的放大倍率
      this.color = random(fill_colors)
      this.stroke = random(line_colors)
    }
draw(){ //劃出單一形狀物件
      push() //執行push以後，依照設定設定原點(0,0)
        translate(this.p.x,this.p.y) //以該物件位置為原點
        scale(this.v.x<0?1:-1,-1) //如果this.v.x<0成立，值為1，否則為-1，y軸為-1(上下翻轉)
        fill(this.color)//填入this.color的顏色
        stroke(this.stroke)//設定描線顏色為this.stroke
        noStroke()//不描邊
        beginShape()//畫圖起始
        for(var k=0;k<points.length;k=k+1){
          vertex(points[k][0]*this.size/2,points[k][1]*this.size/2)//設定一個點，當指令到endShape(close)，會把所有點串連在一起
        }
        endShape(close)//畫圖結束
      pop() //執行pop()，原點(0,0)設定回到視窗左上角

    }

    update(){  //移動的程式碼內容
      // this.p.x=this.p.x+this.v.x //x軸目前位置加上x軸的移動速度
      // this.p.y=this.p.y+this.v.y //y軸目前位置加上y軸的移動速度
      this.p.add(this.v) //設定好向量後，使用add就可以與上面2行指令相同
      // 向量sub==>減號


      if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向，速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=hight)
        this.v.y = -this.v.y //把y軸方向，速度方向改變
      }
    }
    iscatInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<4*this.size){
        return true //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值
      }else{
        return false //滑鼠與物件的距離大於物件的寬度，代表沒有觸碰，則傳回false的值
      }
    }

}