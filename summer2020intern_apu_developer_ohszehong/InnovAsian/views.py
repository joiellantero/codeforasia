from django.shortcuts import render

# Create your views here.

lorem_ipsum_long = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec consequat arcu, quis suscipit magna. Maecenas odio turpis, auctor non leo a, posuere congue risus. Quisque dictum a ex ac eleifend. Sed sit amet vehicula turpis. Nunc odio arcu, fringilla a nibh eu, pharetra varius sem. Duis eleifend, ante a elementum varius, tellus elit facilisis libero, ut semper risus mi in enim. Quisque viverra ipsum in eros varius, sed dapibus metus blandit. Suspendisse justo leo, dapibus blandit orci eget, posuere facilisis nisi.";

def innov_homepage(request):
    return render(request, 'InnovAsian/innov_homepage.html', {"lorem_ipsum_long":lorem_ipsum_long})
