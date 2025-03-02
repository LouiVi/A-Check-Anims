cfg.Light, cfg.MUI;

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	spn = app.CreateSpinner( JSON.parse(app.ReadFile( "a.json" )),1, -1 );
	spn.SetOnChange((item, index)=>{ txt.SetText( item );} );
	lay.AddChild( spn );
	//Create a text label and add it to layout.
	txt = app.CreateText( "Anims" )
	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	
	btn = app.CreateButton( "Animate", 0.4, -1 );
	btn.SetOnTouch( btn_OnTouch )
	lay.AddChild( btn )
	
	
	//Add layout to app.	
	app.AddLayout( lay )
	Anim(txt, 5000, ["Newspaper", "Jelly", "RubberBand"]);
}

function btn_OnTouch()
{
	txt.Animate( spn.GetText() );
}

function Anim(obj, timer, anims)
{
	switch (anims.length) {
		case 1:
			obj.Animate(anims[0], null, timer);
			break;
		case 2:
			obj.Animate(anims[0], ()=>{obj.Animate(anims[1], null, timer);}, timer);
			break;
		case 3:
			obj.Animate(anims[0], ()=>{obj.Animate(anims[1], ()=>{obj.Animate(anims[2], null, timer);}, timer);}, timer);
		  break;
	}
}