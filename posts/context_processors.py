from .models import Category, Language
from django.conf import settings
from .models import Post
import random


def language_category_context(request):
    return {
        'categories': Category.objects.all(),
        'languages': Language.objects.all(),
    }




def popular_and_more_popular_posts(request):
    # Fetch top 10 posts by likes_count and comments_count
    top_likes_posts = list(Post.objects.filter(published=True).order_by('-likes_count', '-created')[:10])
    top_comments_posts = list(Post.objects.filter(published=True).order_by('-comments_count', '-created')[:10])

    # Remove duplicates to get popular posts
    popular_posts = list(set(top_likes_posts + top_comments_posts))
    popular_post_ids = set(post.id for post in popular_posts)

    # Fetch more popular posts, excluding already popular ones
    more_popular_posts = list(Post.objects.filter(
        published=True
    ).exclude(id__in=popular_post_ids).order_by('-likes_count', '-created')[:10])

    # Set image URLs for both popular and more popular posts
    for post in popular_posts + more_popular_posts:
        post.image_url = post.thumbnail.url if post.thumbnail else settings.MEDIA_URL + 'post/default/default_thumbnail.png'

    return {
        'popular_posts': popular_posts,
        'more_popular_posts': more_popular_posts,
    }



def random_posts(request):
    # Fetch published posts
    published_posts = Post.objects.filter(published=True)
    # Get random posts (for example, 5 random posts)
    random_posts_list = random.sample(list(published_posts), min(len(published_posts), 10))
        # Set image URLs for both popular and more popular posts
    for post in random_posts_list:
        post.image_url = post.thumbnail.url if post.thumbnail else settings.MEDIA_URL + 'post/default/default_thumbnail.png'
    
    return {
        'explore_posts': random_posts_list
    }
