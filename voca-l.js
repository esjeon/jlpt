

function App ()
{
  self = {};

  self.display =
    {
      element: document.getElementById ('display'),
      showText: function (txt) { this.element.innerHTML = txt; },
      clear: function () { this.showText(""); }
    };

  self.dictionary =
    {
      element: document.getElementById ('dictionary'),
      queryStr: "http://m.jpdic.naver.com/search.nhn?query=",
      lookup: function (word) { this.element.src = this.queryStr + word; }
    };

  self.remocon =
    {
      element: document.getElementById ('remocon'),
      nextBtn: document.getElementById ('r'),
      prevBtn: document.getElementById ('l'),
      display: document.getElementById ('n'),
      updateIndex: function (idx) { this.display.value = ""+idx; },
      init: function ()
        {
	  this.prevBtn.onclick = function () { self.prev (); };

	  this.nextBtn.onclick = function ()
	    {
	      var v;

	      v = parseInt (self.remocon.display.value);

	      if (v == self.idx) self.next ();
	      else self.go (v);
	    };
	}
    };


  self.list = [];
  self.idx = -1;



  self.setLevel = function (lvl)
    {
      var i,tmp;

      //tmp = document.getElementById ('word'+lvl);
      //self.list = tmp.innerHTML.split ('@');
      self.list = window.Voca[lvl]
      self.idx = 0;
      self.display.element.onclick = function () { self.next (); };

      for (i in self.list)
      {
        tmp = self.list[i].split('_');
        if (tmp[0].length == 0)
          self.list[i] = tmp[1];
        else
          self.list[i] = tmp[0];
      }
    };


  self.prev = function ()
    {
      if (self.idx <= 1) return;
      self.idx --;
      self.display.showText (self.list[self.idx - 1]);
      self.remocon.updateIndex (self.idx);
      self.display.element.onclick = function () { self.showAnswer (); };
    }

  self.next = function ()
    {
      self.idx ++;
      if (self.idx == self.list.length)
        {
          alert ("Finished");

          self.idx = -1;
          self.list = [];
          self.showLevels ();
          return;
        }
      self.display.showText (self.list[self.idx - 1]);
      self.remocon.updateIndex (self.idx);
      self.display.element.onclick = function () { self.showAnswer (); };
    };

  self.showAnswer = function ()
    {
      self.dictionary.lookup (self.list[self.idx - 1]);
      self.display.element.onclick = function () { self.next (); };
    };

  self.go = function (idx)
    {
      if (idx >= self.list.length) return;
      self.idx = idx-1;
      self.next ();
    };



  self.showLevels = function ()
    {
      var i, el, nel;

      el = self.display.element;

      self.display.clear ();
      for (i=1;i<=5;i++)
        {
          nel = document.createElement('input');
          nel.type = "button";
          nel.value = "" + i;
          nel.style.height = "80px";
          nel.style.width  = "50px";
          nel.onclick = function () { self.setLevel (this.value); };
          el.appendChild (nel);
        }
    };

  self.init = function ()
    {
      self.showLevels ();
      self.remocon.init ();
    };


  return self;
}
