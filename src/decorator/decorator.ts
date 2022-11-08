interface People {
    show(): void;
}

class Boy implements People {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    show(): void {
        console.log("I'm boy. My name is", this.name);
    }
}

abstract class PeopleDecorator implements People {
    people: People;
    constructor(people: People) {
        this.people = people;
    }
    show(): void {
        this.people.show();
    }
}

class PeopleDecoratorTshit extends PeopleDecorator {
    show(): void {
        console.log("I wear my T-shirt");
        super.show();
        console.log("My T-shirt is beautiful");
    }
}

// 使用
const boy: Boy = new Boy("Li Lei");
boy.show();
const boyWithTShirt: PeopleDecoratorTshit = new PeopleDecoratorTshit(boy);
boyWithTShirt.show();
