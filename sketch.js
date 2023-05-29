let points = [[-11,4],[-8,9],[-6,6],[-3,6],[-1,9],[1,6],[1,4],[5,4],[7,1],[8,1],[9,2],[9,4],[8,4],[8,6],[10,6],[10,1],[8,-1],[8,-4],[6,-7],[6,-9],[4,-9],[4,-7],[2,-7],[2,-9],[0,-9],[0,-7],[-3,-7],[-3,-9],[-5,-9],[-5,-7],[-7,-7],[-7,-9],[-9,-9],[-9,-7],[-11,-4]]; //list資料，描點
var fill_colors = "ffbe0b-fb5607-ff006e-8338ec-3a86ff".split("-").map(a=>"#"+a)
var line_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)

//------畫points所有"點"的物件變數---------
var cat  //目前要處理的物件，暫時放在cat變數內
var cats =[]  //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//-------飛彈物件定義--------
var bullet //
var bullets = []
//-------怪物物件定義--------
var monster 
var monsters = []
//-------砲台位置--------
var shipP
//--------------------------------
var score = 0 //基礎分


function preload(){  //在程式碼執行前，比setup更早執行
  cat_sound =  loadSound("sound/cat.mp3")
  bullet_sound = loadSound("sound/gun.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)
  for(var i=0;i<10;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    cat = new obj({})  //產生一個obj class元件
    cats.push(cat)  //把cat物件放到cats陣列內
  }
  for(var i=0;i<10;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把cat物件放到cats陣列內
  }
}



function draw() {
  background("#d6ccc2");
  if(keyIsPressed){ //按鍵當下
    if(key=="ArrowLeft" || key =="a"){ //鍵盤左鍵
      shipP.x = shipP.x - 5
   }
   if(key=="ArrowRight"|| key =="d"){ //鍵盤右鍵
     shipP.x = shipP.x + 5
   }
   if(key=="ArrowUp"|| key =="w"){ //鍵盤上鍵
     shipP.y = shipP.y - 5
   }
   if(key=="ArrowDown"|| key =="s"){ //鍵盤下鍵
     shipP.y = shipP.y + 5
   }
  }


  for(let cat of cats) //只要是陣列的方式，都可以用此方法處裡
  {
    cat.draw()
    cat.update()
    for(let bullet of bullets){ //檢查每一個飛彈物件
      if(cat.iscatInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的cat
      cats.splice(cats.indexOf(cat),1) //從倉庫cats取出被滑鼠按到的物件編號(cats.indexOf(cat))
      bullets.splice(bullets.indexOf(bullet),1)
      score = score-2
      cat_sound.play()
      }
    }
  }
//----------飛彈顯示----------
  for(let bullet of bullets) //只要是陣列的方式，都可以用此方法處裡
  {
    bullet.draw()
    bullet.update()
  }
  //----------怪物顯示----------
  for(let monster of monsters) //只要是陣列的方式，都可以用此方法處裡
  {
    if(monster.dead == true && monster.timenum==4){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個飛彈物件
      if(monster.iscatInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的monster
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monter取出被滑鼠按到的物件編號(monster.indexOf(monster))
      bullets.splice(bullets.indexOf(bullet),1)
      score = score+1
      monster.dead = true 
      }
    }
  }

  textSize(50)
  text(score,50,50) //在座標(50,50)上顯示score內容
  fill("#ef233c")//設定顏色
  textSize(50) //設定文字大小
  text(score,50,50) //在座標(50,50)上，顯示score分數
  if(score<0&&score>-15){ 
    text("怎麼可以傷害貓貓！",150,50)
  }
  //-----------中間砲台---------
  push() //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX-width/2
    let dy = mouseY-height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#2a9d8f")
    noStroke()
    rotate(angle)
    // ------------------------
    fill("#6c584c")    
    ellipse(22,20,20)
    fill("#d6ccc2")
    ellipse(22,20,10)
    fill("#6c757d")
    rect(20,-5,80,20)
    fill("#6c584c")
    rect(-5,-5,25,50)
  pop() //恢復原本設定，原點(0,0)在視窗左上角
  //-------------------------------
  if (monsters.length == 0) { //如果怪物數量=0
    cats.splice(0, cats.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈
    background("#d6ccc2")
    fill("#edede9")
    rect(width/2-300,height/2-150,600,300)
    fill("#000000")
    textSize(45)
    text("你的分數是:",width/2-200,height/2-20)//顯示分數
    text(score,width/2+120,height/2-20)
    text("喵星人感謝你的付出",width/2-200,height/2+40)
    }
  
  
  
  
  else if(cats.length == 0){
    monsters.splice(0, cats.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈
    background("#d6ccc2")
    fill("#edede9")
    rect(width/2-300,height/2-150,600,300)
    fill("#000000")
    textSize(45)
    text("你的分數是:",width/2-200,height/2-20)//顯示分數
    text(score,width/2+120,height/2-20)
    text("愛貓人士表使強烈譴責",width/2-200,height/2+40)
    }
}

function mousePressed(){

  //-----------按下產生一個飛彈-------
  bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class物件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放到bullets陣列內(丟到倉庫)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class物件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放到bullets陣列內(丟到倉庫)
  bullet_sound.play()
  }


}



