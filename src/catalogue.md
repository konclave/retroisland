---
layout: layouts/base.njk
---
<header class="padded-wrap">
    <h1 class="main-title"><span class="main-title__website">Васильевский остров</span><span class="main-title__section">Медиатека</span></h1>
    <p class="main-subtitle">Авторский сайт о вокально-инструментальных ансамблях и музыке советской эпохи</p>
</header>
<section class="padded-wrap">
    <form class="catalogue-form">
        <div class="catalogue-form__group">
            <input class="catalogue-form__search-input" type="text" placeholder="Поиск исполнителя" inputmode="search"/>
        </div>
        <!-- <div class="catalogue-form__group">
            <select placeholder="Тип" class="catalogue-form__sort-input" id="catalogue-sort-type">
                <option>Плейлисты</option>
                <option>Исполнители</option>
            </select>
            <select placeholder="Сортировать" class="catalogue-form__sort-input" id="catalogue-order">
                <option>По дате добавления</option>
                <option>А→Я</option>
                <option>Я→А</option>
            </select>
        </div> -->
    </form>
    <ul class="catalogue">
        {%- for item in collections.catalogue -%}
            <li class="catalogue__item">
                <div class="catalogue-entry">
                    <a href="{{ item.data.link }}">
                        <h2 class="catalogue-entry__title">{{ item.data.title }}</h2>
                    </a>
                </div>
            </li>
        {%- endfor -%}
    </ul>
</section>
