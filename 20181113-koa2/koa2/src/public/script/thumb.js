/**
 * Created by flp on 2018/3/31.
 */

class PraiseButton {
  constructor({ target, showNum }) {
    this.num = 0;
    this.target = target;
    this.showNum = showNum;
  }
  addClick() {
    this.target.onclick = () => {
      this.increase();
    };
  }
  increase() {
    this.num++;
    this.showNum.innerHTML = "赞：" + this.num + "次";
    this.addition();
  }
  initnum() {
    const _this=this;
    axios
      .get("/index/initnum")
      .then(function(res) {
        console.log(res);
        _this.num=res.data.rows[0].num;
        _this.addThumb();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  addition() {
    axios
      .get("/index/addition")
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

class Thumb extends PraiseButton {
  constructor({ target, showNum }) {
    super({ target, showNum });
  }
  addThumb() {
    console.log(this.num);
    const thumbHtml = `
                <div class="red1"></div>
                <div class="red2">
                    <div class="red2-1"></div>
                    <div class="red2-2"></div>
                    <div class="red2-3"></div>
                </div>`;
    this.target.innerHTML = thumbHtml;
    this.showNum.innerHTML = "赞：" + this.num + "次";
  }
}
