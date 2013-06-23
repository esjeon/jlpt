
function JLPTKanjiStudy ()
{
  self = {};

  self.AllKanji = window.Kanji;

  /* elements */

  self.display =
    {
      element: document.getElementById ('disp'),
      setText: function (txt) { this.element.innerHTML = txt; }
    };

  self.dictionary =
    {
      query  : 'http://jpdic.naver.com/mini_search.nhn?query=',
      element: document.getElementById ('dict'),

      show   : function () { this.element.style.visibility = "visible"; },
      hide   : function () { this.element.style.visibility = "hidden" ; },
      lookup : function (txt) { this.element.src = this.query + txt; }
    };

  self.checkboxes =
    (function ()
      {
        var ids = ['lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5'];
        var els = {};
        for (i in ids)
	  els[i] = document.getElementById (ids[i]);
	return els;
      }
    ) ();
      

  /* state */

  self.kanji = {};
  self.visit = {}; /* NOTE: always check "visit" */
  self.kanji_left = 0;
  self.nextAction = function () { alert ("Error!"); };


  /* operations */

  self.updateKanjiList = function ()
    {
      newlist = "";
      for (i in self.checkboxes)
      {
        if (self.checkboxes[i].checked)
	  newlist += self.AllKanji[self.checkboxes[i].value];
      }
      
      self.kanji = newlist;
      self.visit = {};
      self.kanji_left = newlist.length;

      self.nextKanji ();
    };

  self.nextKanji = function ()
    {
      var i, c;

      if (self.kanji_left == 0)
	{
	  self.display.setText ("끝");
	  self.dictionary.hide ();
	  self.nextAction = function () {};
	  return;
	}

      do
      {
	i = Math.floor (Math.random () * self.kanji.length);
      } while (self.visit[i]);
      self.visit[i] = true;

      c = self.kanji[i];
      self.kanji_left --;

      self.display.setText (c);

      self.dictionary.hide ();
      self.dictionary.lookup (c);

      self.nextAction = self.showDictionary;
    };

  self.showDictionary = function ()
    {
      self.dictionary.show ();
      self.nextAction = self.nextKanji;
    };

  self.init = function ()
    {
      self.display.setText ("단계를 선택하세요");
      self.dictionary.hide ();
    };

  return self;
}

